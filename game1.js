(function() {

    var user = {

        name: "",
        health: 40,
        healsRemaining: 2,
        wins: 0,
        generateAttackDamage: function() {
            return Math.floor(Math.random() * 3) + 1;
        },

        heal: function() {
            this.health += Math.floor(Math.random() * 10) + 1;
        },

        win: function() {
            this.wins++;
        },

        finiteHeals: function() {
            this.healsRemaining--;
        }
    }

    var computer = {

        name: "Grant the Almighty Chicken",
        health: 10,
        generateAttackDamage: function() {

            return Math.floor(Math.random() * 5) + 1;
        }
    };

    function startGame() {

        var play = prompt("Do you want to play?", "yes or no");

        if (play === "yes") {
            user.name = prompt("What will be your name?");
            startCombat();
        }
    }

    function startCombat() {


        while (user.health > 0 && computer.health > 0) {
            user.health -= computer.generateAttackDamage(); //computer attacks user
            console.log(user.name + " has " + user.health + " left.");

            if (user.health <= 0) {

                console.log(computer.name + " Wins!");
                break;
            }

            computer.health -= user.generateAttackDamage(); //user attacks computer
            console.log(computer.name + " has " + computer.health + " left.");

            if (computer.health <= 0) {
                computer.health += 10;
                user.win();

                if (user.wins >= 5) {

                    console.log(user.name + " Wins!");
                    break;
                }

                console.log("You have beat " + computer.name + " you need to win " + (5 - user.wins) + " round(s)");
                var userContinue = prompt("Would you like to attack, heal, or quit?", "attack, heal, or quit");

                if (userContinue === "quit") {

                    break;
                } else if (userContinue === "heal") {

                    if (user.healsRemaining > 0) {
                        user.heal(); //heals randomly 1 through 10 added to users health
                        user.finiteHeals(); //deducts heals remaining(2 heals overall)
                        console.log(user.name + " has healed and has " + user.health + " health left.");
                        user.health -= computer.generateAttackDamage();
                        console.log(user.name + " gets hit after healing and has " + user.health + " health left!");

                    } else {

                        console.log(user.name + " has no more heals!");
                        userContinue = prompt("Would you like to attack or quit?", "attack or quit");
                        if (userContinue === "quit") {

                            break;
                        }

                    }

                }

            }
        }

    }

    startGame();

})();