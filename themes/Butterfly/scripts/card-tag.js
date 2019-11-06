hexo.extend.tag.register('card', args => {
  const image = args[0]
  const url = args[1]
  const title = args[2] || 'No title'
  return `
    <div class="card">
      <a href=${url}>
        
          <img src="${image}" class="card-img-top" alt="CANNOT RENDER IMAGE">
        
      </a>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text"></p>
      </div>
    </div>
  `
})
