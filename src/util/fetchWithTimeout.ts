export default function(url: string, timeout = 5000) {
  return Promise.race([
    fetch(url).then(response => response.json()),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    ),
  ])
}
