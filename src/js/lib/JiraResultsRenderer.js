function domify(str){
  var dom = (new DOMParser()).parseFromString('<!doctype html><body>' + str,'text/html');
  return dom.body.textContent;
}

export default {
  renderIssues: responseJSON => {
    return responseJSON.issues.map(issue => {
      let statusClass = 'issue-' + issue.fields.status.name.toLowerCase()
      return `
      <div class='issue-card' data-issue-id='${issue.id}'>
        <div class='issue-key'>
          <a href='${issue.self}'>${issue.key}</a>
        </div>
        <div class='issue-status ${statusClass}'>${issue.fields.status.name}</div>
        <p class='issue-summary'>${issue.fields.summary}</p>
      </div>`
    }).join("");
  },
  renderFeed: responseXML => {
    let feed = responseXML.getElementsByTagName('feed');
    let entries = feed[0].getElementsByTagName("entry");
    // debugger
    let feedListItems = Array.from(entries).map(entry => {
      var html = entry.getElementsByTagName("title")[0].innerHTML;
      var updated = entry.getElementsByTagName("updated")[0].innerHTML;
      return "<li>"
        + new Date(updated).toLocaleString() + " - " + domify(html)
        + "</li>";
    }).join("")

    return `<ul>${feedListItems}</ul>`
  }
}
