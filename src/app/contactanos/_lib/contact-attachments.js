/**
 * Contact attachments encoder — client-side (browser APIs: `File`,
 * `arrayBuffer`, `btoa`) conversion of picked files into the wire format
 * the `/api/contacto` endpoint pipeline expects.
 *
 * Output shape: `{ filename, content (base64), encoding: "base64" }[]` —
 * a Nodemailer-style attachment item, validated/sanitized later on the
 * server (size/extension checks in `app/api/contacto/_lib/contact-attachment-validation.js`).
 *
 * Note: this is a per-file byte loop (no chunking, no btoa-on-large-input
 * shortcuts) — attachment size limits are enforced upstream in the form
 * and API, so inputs are guaranteed ≤5 MB per file.
 *
 * @param {FileList|File[]} files The files picked in the contact form.
 * @returns {Promise<{filename: string, content: string, encoding: string}[]>} Base64-encoded attachment payloads.
 */
export async function convertFilesToAttachments(files) {
  const attachments = [];

  for (const file of files) {
    const buffer = await file.arrayBuffer();
    const bufferView = new Uint8Array(buffer);

    let binary = "";

    for (let i = 0; i < bufferView.length; i++) {
      binary += String.fromCharCode(bufferView[i]);
    }

    const base64 = btoa(binary);

    attachments.push({
      filename: file.name,
      content: base64,
      encoding: "base64",
    });
  }

  return attachments;
}
