hexo.extend.tag.register('card', args => {
  const image = args[0];
  const url = args[1];
  const title = args[2] || 'No title';
  let badge = "";
  for(let i = 3; i < args.length; i++) {
    let link = args[i].replace(".", "-");
    badge += `<a href='/tags/${link}' class='badge badge-pill badge-info'>${args[i]}</a>`;
    if (i + 1 < args.length) badge += "&nbsp;&nbsp;"
  }
  return `
    <div class="card">
      <div style="height: 50%;">
        <a href=${url} style="width: 100%; height: 100%;">
            <img src="${image}" class="card-img-top" alt="CANNOT RENDER IMAGE" style="width: 100%; height: 100%;">
        </a>
      </div>
      <div align="center" class="card-body" style="height: 30%; display: table;">
        <div style="display: table-cell; vertical-align: middle;">  
          <h3 class="card-title">${title}</h3>
        </div>
      </div>
      <div align="center" style="height: 20%; display: table;">
          ${badge}
      </div>
    </div>
  `
})
