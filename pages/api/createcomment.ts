export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; },
  object: any) {
console.log('====================================');
console.log(btoa(req.query.auth));
console.log('====================================');
  const baseUrl = "https://www.muganedev.tech/api/v1/";
  const { complaintId, userId, comment, password, username } = req.body;
  console.log('====================================');
  console.log(req.body.jsonComment);
  console.log('====================================');
  try {
    const response = await fetch(`${baseUrl}comments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(req.query.auth)}`
      },
      body: req.body.jsonComment
    });
    if (!response.ok) {
      throw new Error('Request failed with status code ' + response.status);
    }
    const data = await response.json();
    console.log('====================================');
    console.log(data, 'PostComment');
    console.log('====================================');
    return res.status(200).json(data);
  } catch (error) {
    console.log('====================================');
    console.log('Error creating new comment', error);
    console.log('====================================');
  }
}