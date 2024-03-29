var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');
var UserModel = require('../models/Users');

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            user: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: { //Text color
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            textX: {
                type: GraphQLInt
            },
            textY: {
                type: GraphQLInt
            },
            imageX: {
                type: GraphQLInt
            },
            imageY: {
                type: GraphQLInt
            },
            imageHeight: {
                type: GraphQLInt
            },
            imageWidth: {
                type: GraphQLInt
            },
            url: {
                type: GraphQLString
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                    user: {
                        name: "user",
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    //const logoDetails = LogoModel.findById(params.id).exec()
                    const logoDetails = LogoModel.findOne({ _id: params.id, user: params.user }).exec();
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            getLogoByUser: {
                type: new GraphQLList(logoType),
                args: {
                    user: {
                        name: 'user',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logos = LogoModel.find({ user: params.user }).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            },
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    user: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textX: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textY: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageX: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageY: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageHeight: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    url: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    UserModel.findOne({ user: params.user }, function (err, result) {
                        if (err) throw new Error(err);
                        if (!result) {
                            return null;
                        }
                        const logoModel = new LogoModel(params);
                        const newLogo = logoModel.save();
                        if (!newLogo) {
                            throw new Error('Error');
                        }
                        return newLogo
                    })
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    user: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textX: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textY: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageX: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageY: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageHeight: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    url: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id,
                        {
                            user: params.user, text: params.text, color: params.color, fontSize: params.fontSize,
                            backgroundColor: params.backgroundColor, borderColor: params.borderColor,
                            borderWidth: params.borderWidth, borderRadius: params.borderRadius,
                            padding: params.padding, margin: params.margin,
                            width: params.width, height: params.height,
                            textX: params.textX, textY: params.textY,
                            imageX: params.imageX, imageY: params.imageY,
                            imageHeight: params.imageHeight, imageWidth: params.imageWidth,
                            url: params.url, lastUpdate: new Date()
                        }, function (err) {
                            if (err) return next(err);
                        });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });