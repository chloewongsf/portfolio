import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  // Require admin token header
  const adminToken = process.env.ADMIN_TOKEN;
  const provided = req.headers['x-admin-token'];
  if (!adminToken || !provided || String(provided) !== adminToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('formidable error', err);
      res.status(500).json({ error: err.message });
      return;
    }

    const savedFiles = [];
    const fileField = files.file || files.files;
    if (fileField) {
      const arr = Array.isArray(fileField) ? fileField : [fileField];
      for (const f of arr) {
        const filename = path.basename((f as any).path);
        savedFiles.push('/uploads/' + filename);
      }
    }

    const extrasPath = path.join(process.cwd(), 'content', 'extras.json');
    let extras = [];
    try {
      if (fs.existsSync(extrasPath)) {
        extras = JSON.parse(fs.readFileSync(extrasPath, 'utf8')) || [];
      }
    } catch (e) {
      extras = [];
    }

    const item = {
      id: Date.now(),
      title: fields.title || 'Untitled',
      type: fields.type || 'photo',
      files: savedFiles,
      body: fields.body || '',
      createdAt: new Date().toISOString(),
    };

    extras.unshift(item);

    try {
      fs.writeFileSync(extrasPath, JSON.stringify(extras, null, 2));
    } catch (e) {
      console.error('write extras error', e);
    }

    res.status(200).json({ ok: true, item });
  });
}
