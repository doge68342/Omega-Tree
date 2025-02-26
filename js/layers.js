addLayer("b", {
    name: "beta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "β", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#de4e4e",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "beta", // Name of prestige currency
    baseResource: "alpha", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('b', 14)) mult = mult.times(upgradeEffect('b', 14))
        if (hasUpgrade('b', 15)) mult = mult.times(upgradeEffect('b', 15))
        if (hasUpgrade('y', 11)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for beta points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The coolest upgrade",
            description: "Double your alpha gain",
            cost: new Decimal(1),
        },
        12: {
            title: "The matrix",
            description: "50% more alpha, horay!",
            cost: new Decimal(3),
        },
        13: {
            title: "Upgraded Upgrade",
            description: "Boost alpha gain based on beta",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Because why not?",
            description: "Boost beta gain based on alpha",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Very nice upgrade",
            description: "5x alpha and 2.5x beta",
            cost: new Decimal(20),
            effect() {
                return new Decimal(2.5)
            },
        },
    },
})

addLayer("y", {
    name: "gamma", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "γ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffb861",
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "gamma", // Name of prestige currency
    baseResource: "beta", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for beta points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "beta beta beta",
            description: "Gain 3 times more beta",
            cost: new Decimal(1),
        },
        12: {
            title: "This will help",
            description: "alpha ^ 1.1",
            cost: new Decimal(4),
        },
    },
})