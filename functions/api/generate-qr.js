import qr from 'qrcode'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Content-type': 'application/json',
  'Access-Control-Max-Age': '86400'
}

export async function onRequestPost(context) {

  console.log('MIRANDOOOOOOOOOOOOOOOOACACAAAA')
  const colorValue = `#${Math.random().toString(16).slice(-6)}`
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  // Contents of context object

  const { url } = await request.json()
  const qrImage = await qr.toString(url, { type: 'svg', color: { light: '#FFFFFF', dark: colorValue } })

  const response = new Response(JSON.stringify({ svg: qrImage }))

  response.headers.set('Access-Control-Allow-Origin', '*',)
  response.headers.set('Access-Control-Allow-Headers', '*',)
  response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS')

  return response
}

export async function onRequestOptions(context) {

  const { request } = context

  console.log('REQUEST ES: ', request.url)

  const response = new Response()

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', '*')

  return response
}


