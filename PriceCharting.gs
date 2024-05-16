function getPrice(console, name, condition, region) {  
  switch (region) {
    case "JP":
    case "JPN":
    case "Japan":
      region = "jp-";
      break;
    default:
      region = "";
  }
  var url = `https://www.pricecharting.com/game/${region}${toSlug(console)}/${toSlug(name)}`;
  var html = UrlFetchApp.fetch(url).getContentText();


  var prices = {};
  
  var patterns = {
    usedPrice: /<td id="used_price">\s*<span class="price js-price">\s*\$([0-9,.]+)\s*<\/span>/,
    completePrice: /<td id="complete_price">\s*<span class="price js-price">\s*\$([0-9,.]+)\s*<\/span>/,
    newPrice: /<td id="new_price">\s*<span class="price js-price">\s*\$([0-9,.]+)\s*<\/span>/,
    gradedPrice: /<td id="graded_price">\s*<span class="price js-price">\s*\$([0-9,.]+)\s*<\/span>/,
    boxOnlyPrice: /<td id="box_only_price">\s*<span class="price js-price">\s*\$([0-9,.]+)\s*<\/span>/,
    manualOnlyPrice: /<td id="manual_only_price">\s*<span class="price js-price">\s*\$([0-9,.]+)\s*<\/span>/
  };
  
  for (var key in patterns) {
    var match = html.match(patterns[key]);
    if (match && match.length > 1) {
      prices[key] = parseFloat(match[1]);
    }
  }
  switch(condition) {
    case "New":
    case "Sealed":
      return prices.newPrice;
      break;
    case "Complete":
    case "CIB":
      return prices.completePrice;
      break;
    default:
      return prices.usedPrice;
      break;
  }
}

function toSlug(inputString) {
  return inputString.toLowerCase().replace(/\s+/g, '-');
}

function getURL (console, name, condition, region) {
    switch (region) {
    case "JP":
    case "JPN":
    case "Japan":
      region = "jp-";
      break;
    default:
      region = "";
  }
  
  if (console == "" || name == "") {
    return "";
  }

  var url = `https://www.pricecharting.com/game/${region}${toSlug(console)}/${toSlug(name)}`;
  return url;
}
