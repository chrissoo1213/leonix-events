import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "hazzouri.chris@gmail.com",
    subject: "New Leonix Request",
    html: `
      <h2>New Request</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Company:</strong> ${body.company}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Location:</strong> ${body.location}</p>
      <p><strong>Requirements:</strong> ${body.requirements}</p>
    `
  })

  return Response.json({ success: true })
}