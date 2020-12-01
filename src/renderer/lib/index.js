export function cookieFromRequest (req, key) {
  if (!req.headers.cookie) {
    return
  }

  const cookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`))

  if (cookie) {
    return cookie.split('=')[1]
  }
}
export function extractErrors (response, erromsg, noWrap) {
  let error = {}
  const errors = {}

  if (response && response.constructor.name === 'Error' && response.response) {
    response = response.response
  }
  if (
    !response ||
    !response.data ||
    typeof response.data !== 'object' ||
    typeof response.data !== 'object'
  ) {
    error = { error: erromsg || 'Some error occured' }
  } else if (response.data.error) {
    if (typeof response.data.error === 'string') {
      response.data.error = [response.data.message || response.data.error]
    }
    Object.keys(response.data.error).forEach(v => {
      errors[v] = Array.isArray(response.data.error[v])
        ? response.data.error[v][0]
        : response.data.error[v]
    })
    error = { ...errors }
  } else if (response.data.errors) {
    Object.keys(response.data.errors).forEach(v => {
      errors[v] = Array.isArray(response.data.errors[v])
        ? response.data.errors[v][0]
        : response.data.errors[v]
    })
    error = { ...errors }
  } else if (response.data.message) {
    error = { error: response.data.message }
  } else if (response.status === 404) {
    error = { error: 'Api end point not found' }
  } else {
    error = { error: erromsg || 'Some error occured' }
  }

  return noWrap ? error : errorHtml(error, noWrap)
}

export function errorHtml (errors, sep) {
  const html = []
  if (!errors) {
    return ''
  }
  if (errors.constructor.name === 'string') {
    return errors
  }
  const keys = Object.keys(errors)
  if (!keys.length) {
    return ''
  }
  const hasSep = typeof sep !== 'undefined'
  if (!hasSep) {
    html.push('<ul>')
  }
  keys.forEach(v => {
    html.push(
      (hasSep ? sep : '<li>') + (Array.isArray(errors[v]) ? errors[v][0] : errors[v]) + (hasSep ? '' : '</li>')
    )
  })
  if (!hasSep) {
    html.push('</ul>')
  }
  return html.join('\n')
}
