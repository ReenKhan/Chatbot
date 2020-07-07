const GameState = Object.freeze({
    START:   Symbol("start"),
    INVESTIGATE:  Symbol("investigate"),
    CLUE: Symbol("clue"),
    INSPECT: Symbol("inspect"),
    HALLWAY: Symbol("hallway"),
    FOLLOW: Symbol("follow"),
    CAMERA: Symbol("camera"),
    MAZE: Symbol("maze"),
    ENGINE: Symbol("engine"),
    ROPE: Symbol("rope")
});

module.exports = class Game{

    constructor(){
        this.stateCur = GameState.START;
        this.mazeCount = 1;    
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.START:
                sReply = "You are a shipping officer and you see a dead body buried at a beach with a mysterious abandoned ship called The Phantom. Do you want to investigate further? YES OR NO?";
                this.stateCur = GameState.INVESTIGATE;
                break;
            case GameState.INVESTIGATE:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "Upon further investigation two clues are found, one is a teddy bear at the beach and other is a ticket from the dead body's belongings. Which clue would you like to proceed with, TEDDY or TICKET?";
                    this.stateCur = GameState.CLUE;
                }else if(sInput.toLowerCase().match("no")){
                    sReply ="Your higher officials have been informed about the ship and want you to continue the investigation with the two clues found, one is a teddy bear at the beach and other is a ticket from the dead body's belongings. Which clue would you like to proceed with, TEDDY or TICKET? ";
                    this.stateCur = GameState.CLUE;
                }
                else{
                    sReply="Please enter YES or NO.";
                    this.stateCur = GameState.INVESTIGATE;
                }
                break;
            case GameState.CLUE:
                if(sInput.toLowerCase().match("ticket")){
                    sReply = "The ticket is found to be of the dead women and indicates that The Phantom was set to sail 11 years ago. You are required to inspect The Phantom to unfold the mystery.Type INSPECT to enter The Phantom";
                    this.stateCur = GameState.INSPECT;
                }
                else if(sInput.toLowerCase().match("teddy")){
                    sReply = "The teddy does not lead the case anywhere so you switch to inspecting the ticket, which is found to be of the dead women and indicates that The Phantom was set to sail 11 years ago. You are required to inspect the phantom to unfold the mystery. Type INSPECT to enter The Phantom";
                    this.stateCur = GameState.INSPECT;
                }
                else{
                    sReply = "Oops!! That was not one of the clues, enter the mentioned clue, Teddy or Ticket?";
                    this.stateCur = GameState.CLUE;

                }
                break;
                case GameState.INSPECT:
                    if(sInput.toLowerCase().match("inspect")){
                        sReply="Upon entering the ship you see someone run across the hallway. Do you want to LEAVE or INVESTIGATE?";
                        this.stateCur = GameState.HALLWAY;
                    }else{
                        sReply="Please enter INSPECT to unfold the mystery!";
                        this.stateCur = GameState.INSPECT;
                    }
                break;
                case GameState.HALLWAY:
                    if(sInput.toLowerCase().match("leave")){
                    sReply= "You run towards the exit and find out that the door is locked and there is no way out so you turn back to search for an alternate exit and then again you see someone in the hallway. Do you want to follow? YES OR NO?";
                    this.stateCur = GameState.FOLLOW;
                }
                    else if(sInput.toLowerCase().match("investigate")){
                        sReply="You look through all the rooms down the hallway but all of them are locked and then you see someone again. Do you want to follow? YES OR NO?";
                        this.stateCur = GameState.FOLLOW;
                    }else{
                        sReply="Please enter the proper options.Do you want LEAVE OR INVESTIGATE?";
                        this.stateCur = GameState.HALLWAY;
                    }
                    break;
                    case GameState.FOLLOW:
                        if(sInput.toLowerCase().match("yes")){
                        sReply="You follow the person for a long time and they lead you to the engine room. Do you want to ENTER or TURN BACK?";
                        this.stateCur = GameState.CAMERA;
                    }else if(sInput.toLowerCase().match("no")){
                        sReply="When you turn to leave you see nothing but a wall from where you came, so you follow the person and they lead you to the engine room. Do you want to ENTER or TURN BACK";
                        this.stateCur = GameState.CAMERA;
                    }else{
                        sReply= "Oops!! Enter YES OR NO."
                        this.stateCur = GameState.FOLLOW;
                    }
                            break;

            case GameState.CAMERA:
                if(sInput.toLowerCase().match("enter")){
                    sReply = "You enter the engine room where you find a video camera and you learn that all the crew members committed suicide. You get frightened and want to leave. You see an exit door in the engine room. Do you want to use the exit door?YES OR NO?";
                    this.stateCur = GameState.MAZE;
                }else if(sInput.toLowerCase().match("turn back")){
                    sReply="OH LORD! There is someone behind you so you rush into the engine room and find a camera and you learn that all the crew members committed suicide. You get frightened and want to leave. You see an exit door in the engine room. Do you want to use the exit door?YES OR NO?";
                    this.stateCur = GameState.MAZE;
                }else{
                    sReply = "Type ENTER or TURN BACK to unfold the mystery!!";
                    this.stateCur = GameState.CAMERA;
    
                }
                break;
            case GameState.MAZE:
                if(sInput.toLowerCase().match("yes")) {
                    sReply = "There are stairs 10 feet away. Do you want to use it? YES OR NO?";
                    this.stateCur = GameState.ENGINE;
                }
                else if(sInput.toLowerCase().match("no")){
                    sReply= "You hear a weird sound and the shelf in the room starts shaking so you decide to leave the engine room, there are stairs 10 feet away. Do you want to use it? YES OR NO?"
                    this.stateCur = GameState.ENGINE;
                }
                else{
                    sReply = "HURRY! Enter either YES OR NO ";
                    this.stateCur = GameState.MAZE;
                }
                
                break;
            case GameState.ENGINE:
                if(sInput.toLowerCase().match("yes")) {
                    if(this.mazeCount <= 3) {
                        sReply = "You are again in the engine room for time " + this.mazeCount + ". You still see the stairs. Do you want to use it?";
                        this.stateCur = GameState.ENGINE;
                        this.mazeCount++;
                    }
                    else {
                        sReply = "voilà! after the maze situation you see a rope in engine room, to use the rope enter USE ROPE";
                        this.stateCur = GameState.ROPE;
                    }
                }
                else if(sInput.toLowerCase().match("no")) {
                    sReply= "You see no other way out of the engine room leaving you with the option of using the stairs. enter YES to use the stairs ";
                    this.stateCur = GameState.ENGINE;
                }
                else{
                    sReply= "Please enter YES or NO!";
                    this.stateCur = GameState.ENGINE;
                }
                break;
            case GameState.ROPE:
                if(sInput.toLowerCase().match("use rope")) {
                    sReply="You take the rope and climb up to reach the dock. Good choice you have escaped!!The game is over. Enter any key to restart the game";
               this.stateCur = GameState.START;
                }else{
                    sReply="Oh lord hurry! type USE ROPE to escape, that creepy thing seems to be coming right behind you!!";
                    this.stateCur = GameState.ROPE;
                }
                break;
        }
        return([sReply]);
    }
}