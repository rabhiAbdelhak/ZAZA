import { NextApiRequest, NextApiResponse } from 'next'

const todos = [
  {
    id: 1,
    name: 'Doout',
    logo: 'https://images-platform.99static.com/2he44ADAEnOFqpmvr14cRhLGqyg=/0x0:1201x1201/500x500/top/smart/99designs-contests-attachments/100/100162/attachment_100162107',
  },
  {
    id: 2,
    name: 'jjghft',
    logo: 'https://img.freepik.com/premium-vector/express-delivery-logo-design-vector-template_441059-203.jpg?w=2000',
  },
  {
    id: 3,
    name: 'jjghft',
    logo: 'https://st3.depositphotos.com/5572200/15094/v/600/depositphotos_150942812-stock-illustration-a-man-is-riding-a.jpg',
  },
  {
    id: 4,
    name: 'jjghft',
    logo: 'https://startup.dz/wp-content/uploads/2020/12/logo_sdz.png',
  },
  {
    id: 5,
    name: 'jjghft',
    logo: 'https://www.delivery.com/images/static/dcom-logo-og-share.jpg',
  },
]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      res.status(200).json(todos)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
