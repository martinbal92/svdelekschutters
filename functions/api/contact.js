export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify Cloudflare Turnstile token
    const turnstileToken = formData.get('cf-turnstile-response');
    const turnstileSecret = context.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken,
        remoteip: context.request.headers.get('CF-Connecting-IP'),
      }),
    });

    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ error: 'Captcha verificatie mislukt. Probeer het opnieuw.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          { to: [{ email: 'bestuur@delekschutters.nl', name: 'SV de Lekschutters' }] },
        ],
        from: { email: 'noreply@delekschutters.nl', name: `${name} via website` },
        reply_to: { email: email, name: name },
        subject: subject || `Contactformulier: bericht van ${name}`,
        content: [
          {
            type: 'text/plain',
            value: `Naam: ${name}\nE-mail: ${email}\nOnderwerp: ${subject || '(geen)'}\n\nBericht:\n${message}`,
          },
        ],
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Er ging iets mis. Probeer het later opnieuw.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
