hexo.extend.tag.register('gallery', args => {
  const image = args[0]
  const url = args[1]
  const title = args[2] || 'No title'
  return `
    <div
      class="gallery-item"
      style="background-image: url('${image}');"
      data-title="${title}"
      data-url="${url}"
      data-image="${image}"
      data-
    >
      <div class="gallery-item__title">
        ${title}
      </div>
    </div>
  `
})
