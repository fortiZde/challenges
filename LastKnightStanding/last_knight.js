/**
 * 2019-06-14
 * Last Knight Standing
 * 20 Minutes
 */

const Knight = (name, health = 100, minDmg = 1, maxDmg = 5) => {
    let attackCount = 0
    let hitCount = 0
    return {
        get name() {
            return name
        },
        get health() {
            return health
        },
        get hitCount() {
            return hitCount
        },
        get attackCount() {
            return attackCount
        },
        attack: (target) => {
            attackCount++
            let dmg = Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg
            console.log(`${name}[${health}] hits ${target.name}[${target.health}] with ${dmg} ${(dmg === maxDmg) ? "CRIT" : ""}`)
            target.takeDamage(dmg)
        },
        isAlive: () => (health > 0),
        takeDamage: (hp) => {
            hitCount++
            health -= hp
            if (health <= 0)
                console.log(`† ${name} † succumbed to his injuries. † RIP †`)
        }
    }
}



const LastKnightStandingRule = participients => {
    let participientsAlive = [...participients]
    let round = 1

    const stats = (participient) => {
        console.log(`Name: ${participient.name}`,
            `Health: ${participient.health}`,
            `Hits: ${participient.hitCount}`,
            `Attacks: ${participient.attackCount}`,
            (participient.isAlive()) ? "" : "[DEAD]")
    }

    const roundReducer = (attackers, attacker, currentIndex, participients) => {
        let victim = participients[(currentIndex + 1) % participients.length]
        if (attacker.isAlive()) {
            attackers.push(attacker)
            attacker.attack(victim)
        }
        return attackers;
    }

    while (participientsAlive.length > 1) {
        console.log(`=========== Round ${round} ===========`)

        participientsAlive = participientsAlive
            .reduce(roundReducer, [])
            .filter((elem) => elem.isAlive())

        round++
        console.log(`=========== Participients ===========`)
        participients.map(stats)
    }
    return participients.find(participient => participient.isAlive())
}

const GameAreaInit = (name, rules, participients) => {
    console.log(`======= Welcome to ${name} =======`)
    let winner = rules(participients)
    console.log(`======= ${name} ENDS!!! =======`)
    console.log(`🏆 ${winner.name} has won the turnament 🏆`)
}




GameAreaInit('Last Knight Standing', LastKnightStandingRule,
    [Knight('John', 100),
    Knight('Wilson', 100),
    Knight('Deckard', 100),
    Knight('Richard', 100),
    Knight('Sam', 100),
    Knight('Paeffluff', 100),
    ])