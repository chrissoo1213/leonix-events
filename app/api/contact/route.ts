import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(req: Request) {
  try {
    if (!resend) {
      return Response.json(
        { success: false, error: "Email service is not configured" },
        { status: 503 }
      )
    }

    const body = await req.json()

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "hazzouri.chris@gmail.com",
      subject: `New Leonix Request - ${body.company}`,
      html: `
        <h2>New Event Request</h2>

        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Location:</strong> ${body.location}</p>
        <p><strong>Date:</strong> ${body.date}</p>

        <h3>Requirements</h3>
        <p>${body.requirements}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json(
      { success: false },
      { status: 500 }
    )
  }
}