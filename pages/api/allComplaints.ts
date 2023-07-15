export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; },
  object: any) {

  const baseUrl = "https://www.muganedev.tech/api/v1/";
  const { username, password } = req.body;
  try {
    const response = await fetch(`${baseUrl}complaints/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }
    });
    if (!response.ok) {
      throw new Error('Request failed with status code ' + response.status);
    }
    const data = await response.json();
    console.log('====================================');
    console.log(data, 'Homepage');
    console.log('====================================');
    return res.status(200).json(data);
  } catch (error) {
    console.log('====================================');
    console.log('Error fetching allcomplaints', error);
    console.log('====================================');
  }
}