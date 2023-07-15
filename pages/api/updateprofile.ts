import { baseUrl } from "../../src/components/home";


export default async function handler(req: { body: { mp: any; auth: any; uId: any; }; }, res: { send: any, status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
    const { mp, auth, uId } = req.body;
    console.log('====================================');
    console.log(mp, auth, uId);
    console.log('====================================');
    try {
        const response = await fetch(`${baseUrl}users/update/${uId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(mp),
        });
        const data = await response.json();
        //   res.send(data.data)
        console.log('====================================');
        console.log(data, 'updateprofile page');
        console.log('====================================');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
}