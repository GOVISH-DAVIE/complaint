export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; },
  object: any) {

  const baseUrl = "https://www.muganedev.tech/api/v1/";
  const { username, password } = req.body;
  try {
    const response = await fetch(`${baseUrl}users/`, {
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
    console.log(data, 'Loginpage');
    console.log('====================================');
    return res.status(200).json(data);
  } catch (error) {
    console.log('====================================');
    console.log('Error fetching userdata', error);
    console.log('====================================');
  }
}









