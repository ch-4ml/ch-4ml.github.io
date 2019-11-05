hexo.extend.tag.register('card', args => {
    const image = args[0]
    const url = args[1]
    const title = args[2] || 'No title'
    return `
    <div class="card" style="width: 18rem;">
        <a href="${url}">
            <img src="${image}" class="card-img-top" alt="...">
        </a>
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">아이콘으로 태그 넣는 자리</p>
            </a>
        </div>
    </div>
    `
  })
  