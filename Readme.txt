get all logos

{
  logos {
    user
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    textX
    textY
    imageX
    imageY
    imageWidth
    imageHeight
    url
    lastUpdate
  }
}

get logo for user

{
  getLogoByUser(user: "109456571678036129094") {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    textX
    textY
    imageX
    imageY
    imageWidth
    imageHeight
    url
    lastUpdate
  }
}

add a logo
mutation {
  addLogo(
    user: "109456571678036129094", 
    text: "abc", 
    color: "#ff5733", 
    fontSize: 12, 
    backgroundColor: "#a569bd", 
    borderColor: "#707b7c", 
    borderRadius: 10, 
    borderWidth: 10, 
    padding: 10, 
    margin: 10,
  	width: 10,
    height:10,
    textX: 25,
    textY: 25,
    imageX:0,
    imageY: 0,
    imageWidth:0,
    imageHeight: 0,
    url:""
  ) {
    _id
    user
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    width
    height
    textX
    textY
    imageX
    imageY
    imageHeight
    imageWidth
    url
    lastUpdate
  } 
}

Update Logo

mutation {
  updateLogo(
    id: "5ecc0fcb85097978b0950f00",
    user: "109456571678036129094", 
    text: "GoLogo", 
    color: "#ff5733", 
    fontSize: 12, 
    backgroundColor: "#a569bd", 
    borderColor: "#707b7c", 
    borderRadius: 10, 
    borderWidth: 10, 
    padding: 10, 
    margin: 10,
  	width: 10,
    height:10,
    textX: 25,
    textY: 25,
    imageX:0,
    imageY: 0,
    imageWidth:0,
    imageHeight: 0,
    url:""
  ) {
    _id
    user
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    width
    height
    textX
    textY
    imageX
    imageY
    imageHeight
    imageWidth
    url
    lastUpdate
  } 
}

Remove Logo
mutation {
  removeLogo(
    id: "5ecc0fcb85097978b0950f00",
  ) {
    _id
    user
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    width
    height
    textX
    textY
    imageX
    imageY
    imageHeight
    imageWidth
    url
    lastUpdate
  } 
}