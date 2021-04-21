import React from "react";

function PvpRules(){
    return(
        <div classname="PvpRules">
            <div class="container">
            <div class="row align-items-center mb-3">
                <h1 class="font-weight-light">PVP Rules</h1>
                </div>
                <div class="row">       
                <h2 class="font-weight-light">Kill Confirmed</h2>
                    <p>
                        <li>There are two teams, each starting on opposite sides of the area.</li>
                        <li>Each team has 60 poker chips, which represent lives.</li>
                        <li>Every play starts with a poker chip, and if shot they must drop all of their poker chips, return to their respawn point, get a new chip and return to the game.</li>
                        <li>Respawn points will be marked with cones, players are safe while within their respawn point.</li>
                        <li>Players may pick up poker chips of either team.</li>
                        <li>First team to bring 30 of the other team’s poker chips to their respawn point wins.</li>
                    </p>
                </div>
                <div class="row align-items-center my-3">
                <h2 class="font-weight-light">Ammo Shortage</h2>
                    <p>
                        <li>There are two teams, each starting on opposite sides of the area.</li>
                        <li>Every player starts with a set amount of ammunition.</li>
                        <li>Players have unlimited respawns, once shot you must return to your spawn and then return to the game.</li>
                        <li>There are 20 tiny boxes hidden around the area. Each box contains more ammunition, and a random 5 of them contain victory points.</li>
                        <li>Players may hold a single box at a time, and can only open them when they bring them back to their spawn.</li>
                        <li>If shot while carrying a box, you must drop the box and go respawn.</li>
                        <li>First team to collect 3 victory points wins.</li>
                    </p>
                </div>
                <div class="row align-items-center my-3">
                <h2 class="font-weight-light">Protect the President</h2>
                    <p>
                        <li>There are two teams, the Secret Service and Assassins.</li>
                        <li>The Secret Service must escort The President from their spawn point, to the other end of the area, and back, within a certain time limit, without letting The President get hit by a dart.</li>
                        <li>The Assassins win if they can hit The President with a single dart before the Secret Service get them back to their spawn.</li>
                        <li>The Secret Service have unlimited respawns, once shot they must return to their spawn and then return to the game.</li>
                        <li>The Assassin’s have no respawns, but get released into the area a minute before the Secret Service, in order to set up.</li>
                        <li>This game will be played in rounds, with Secret Service and Assassins switching between rounds.</li>
                    </p>
                </div>
                <div class="row align-items-center my-3">
                <h2 class="font-weight-light">Free for All</h2>
                    <p>
                        <li>Free for All will be a <b>pistols-only</b> game type.</li>
                        <li>Players will start with 3 wristbands, and each time you get shot you must leave the field of play, count to 10 and remove a wristband, then spawn back in to battle.</li>
                        <li>Forming teams and camping are not allowed, if the moderator sees you doing so they will pull out a blaster and shoot you.</li>
                        <li>As the game goes on, the cones that mark the borders of the area will be slowly brought closer together to shrink the field of play.</li>
                    </p>

                </div>
                <div class="row align-items-center mt-3">
                <h2 class="font-weight-light">Rush</h2>
                </div>
                <div class="row mb-5">
                    <p>
                        <li>There are two teams, the attackers and the defenders.</li>
                        <li>The attackers must capture all 3 of the defenders’ objectives.</li>
                        <li>Objectives must be grabbed by an attacker, once grabbed the attacker can no longer fire their blaster, and must drop the objective if shot.</li>
                        <li>A mod carrying a green flag will start at the attacker’s spawn and slowly walk towards the objective.</li>
                        <li>Attackers have unlimited respawns, and must walk back to the mod with the flag in order to respawn.</li>
                        <li>Defenders have a single life per objective, once hit by a dart they must move back to their next objective and respawn.</li>
                        <li>Once attackers take an objective, all remaining defenders move back to the next objective.</li>
                        <li>Once the attackers take the final objective, the teams switch and try to get a faster time. Whichever team captured all 3 objectives fastest wins.</li>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default PvpRules;
