import { baseUrl } from "../../src/components/home";


export default async function handler(req: { body: { username: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
    const { username, email, password } = req.body;

    try {
        const response = await fetch(`${baseUrl}users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
    const data = await response.json();
   console.log('====================================');
   console.log(res.status(200).json(data), 'apipage');
   console.log('====================================');        
    } catch (error) {
        res.status(500).json({ message: 'Error submitting registration form' });
    }
}
