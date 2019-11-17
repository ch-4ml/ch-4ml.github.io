hexo.extend.tag.register('skill', args => {
    const title = args[0];
    const percent = args[1];
    const color = args[2]; /* primary: blue, secondary: gray, success: green, info: skyblue, warning: yellow, danger: red, light: lightgray, dark: darkgray, white: white */
    const tag = title.replace(".", "-");
    return `
      <table>
        <tr>
          <td width="10%" style="vertical-align: middle; border: 0;">
            <a href="/tags/${tag}">
              <img src="/about/index/${title}.png" class="card-img-top" alt="CANNOT RENDER IMAGE" style="width: 100%; height: auto;">
            </a>
          </td>
          <td width="90%" style="vertical-align: middle; border: 0;">
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-${color}" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" style="width: ${percent}%">
              <span class="title">${percent}%</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
      </div>
    `
});
  