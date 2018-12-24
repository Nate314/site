class DBApplications {
  public getApplications() {
    return db.nate314.home.pages[0];
  }

  public getJavaApplications() {
    return db.nate314.home.pages[0].subpages[0];
  }

  public getWebApplications() {
    return db.nate314.home.pages[0].subpages[1];
  }

  public getAndroidApplications() {
    return db.nate314.home.pages[0].subpages[2];
  }
}

class DBVideos {
  public getVideos() {
    return db.nate314.home.pages[1].subpages[0]["videos"];
  }
}

export class DB {

  public static dbApplications: DBApplications = new DBApplications();

  public static dbVideos: DBVideos = new DBVideos();

  public static getDB() {
      return db;
  }

  public static getHome() {
    return db.nate314.home;
  }

  public static getPages() {
    return db.nate314.home.pages;
  }

}

const db = {
    nate314: {
        home: {
            title: "Nathan Gawith",
            subtitle: "my github website",
            name: "Home",
            sections: ["Site Map", "Other Websites"],
            otherwebsites: "Check out my friend's websites. They have also have lotsof cool software that you can download."
            + "<ul><li>Hanavan's <a href=\"http://thekuhnbros.com/hanavan/\">website</a></li><li>Cody's <a href=\""
            + "https://codymoose.github.io\">website</a></li><li>Alex's <a href=\"http://alexwebber.org/\">website</a></li></ul>>",
            pages: [{
                    title: "Applications",
                    name: "Applications",
                    subpages: [{
                            name: "JavaApplications",
                            description: "You can downlad any of these java applications by clicking on the name "
                              + "of the application below, or you can view a list of all of the applications and descriptions ",
                            link: "applications/java",
                            apps: [
                                {
                                    name: "Clock",
                                    file: "Clock.jar",
                                    description: "This is a Clock prgram written in Java. This application is pretty self "
                                    + "explanitory. When launched, an analog clock will be displayed with the current time. "
                                    + "If you prefer digital, just click on the clock to toggle between analog and digital."
                                },
                                {
                                    name: "DinoGame1920x1080",
                                    file: "DinoGame1920x1080.jar",
                                    description: "This is a game playing bot written in Java. This program jumps over most "
                                    + "cacti in the Dinosaur Game that can be played in Google Chrome when you don't have an"
                                    + " internet connection. Sadly, it only currently works on a screen resolution of 1920x1080"
                                    + " when Chrome is maximized in windows. It doesn't yet duck under the pterodactyls yet, so"
                                    + " you will have to take care of that part of the game yourself."
                                },
                                {
                                    name: "FlappyBird",
                                    file: "FlappyBird1.1.zip",
                                    description: "This is my verion of Flappy Bird written in Java. Controls are listed below: "
                                    + "<br>space: flap<br /><code>p: play/pause<br>d: toggle developer mode<br>r: restart <br>"
                                    + "left/right: slow down/speed up game</code>"
                                },
                                {
                                    name: "Minesweeper",
                                    file: "Minesweeper1.2.jar",
                                    description: "This is my verion of Microsoft's Minesweeper written in Java. You can flag a"
                                    + " square by right clicking, or attack by left clicking."
                                },
                                {
                                    name: "NathaNOS",
                                    file: "NathaNOS1.1.zip",
                                    description: "This is my \"OS\" written in Java. When you open it, the easiest way to close"
                                    + " it is to use the Shut Down button found by clicking on the menu in the bottom left hand"
                                    + " corner. This \"OS\" was written to run Java applications inside of it. The only application"
                                    + " that I have included with this version of NathaNOS is my clock application. To run a java"
                                    + " program inside of it, drag and drop the jar file into the NathaNOS1.1/assets and you should"
                                    + " be ready to go!</p> <p>Note: if you want to add one of your own java programs to NathaNOS,"
                                    + " then you will have to make the main class extend a JFrame, and you will have to make the"
                                    + " constructor of your main class have one parameter that is a Boolean for visibility. You can"
                                    + " see an example below:<pre><code>package clock;\n\nimport javax.swing.JFrame;\n\npublic"
                                    + " class Main extends JFrame\n{\n\tpublic Main(Boolean visibility)\t{\n\t\tthis.setVisible"
                                    + "(visibility.booleanValue());\n\t}\n}\n</code></pre>"
                                },
                                {
                                    name: "RubiksCube2D",
                                    file: "RubiksCube2D_3.jar",
                                    description: "This is a 2D Rubik's Cube written in Java. To rotate, click on a square and"
                                    + " then use wasd to rotate in the correlated direction."
                                },
                                {
                                    name: "ScreenSaver",
                                    file: "ScreenSaver0.1.jar",
                                    description: "This is a Screen Saver written in Java. It should close if you move your mouse."
                                },
                                {
                                    name: "SpriteFloatyStars",
                                    file: "SpriteFloatyStars1.0.jar",
                                    description: "This is a background program written in Java. Check out each of the cool"
                                    + " modes. My personal favorite is Mode 3."
                                },
                                {
                                    name: "UltimateTicTacToe",
                                    file: "UltimateTicTacToe1.1.jar",
                                    description: "This is an UltimateTicTacToe game written in Java. If you don't know how"
                                    + " to play, you can check out the rules <a href=\"https://www.youtube.com/watch?v=37PC0bGMiTI\""
                                    + ">here</a>"
                                }
                            ]
                        },
                        {
                            name: "WebApplications",
                            description: "You can use any of these web applications by clicking on the name "
                              + "of the application below, or you can view a list of all of the applications and descriptions ",
                            link: "applications/web",
                            apps: [{
                                    name: "BettingCalculator",
                                    file: "webapplications/bettingcalculator",
                                    description: "Betting Calculator can be used if you want to place bets on things and don't want"
                                    + " to have to worry about the math. You can set up the number of things you are btting on and"
                                    + " the number of humans that are placing bets, and then the winnings will be split"
                                    + " proportionally between the palyers that placed bets on the thing that actually won."
                                },
                                {
                                    name: "ColorFlux",
                                    file: "https://nate314.github.io/nathangawith/applications/webApplications/colorFlux.html",
                                    description: "Color Flux is an application that you could possibly use as a live background"
                                    + " written in javascript. It just pulses between different colors continuously."
                                },
                                {
                                    name: "FinalGradeCalculator",
                                    file: "webapplications/finalgradecalculator",
                                    description: "Final Grade Caclculator is a useful tool for when you are in a crunch and want"
                                    + " to prioritize study time. Enter your current grade in the class, the percentage of your"
                                    + " grade the final is worth, and the percentage you want to finish the class with. Once"
                                    + " you submit, this application will tell you the percentage you need in order to achieve"
                                    + " your goal."
                                },
                                // {
                                //     name: "GradeCalculator",
                                //     file: "webapplications/gradecalculator",
                                //     description: "Currently, this calculator is hard coded to work for Jacob Pursley's Physics"
                                //     + " 240 class, but I plan on de-hardcoding it in the future."
                                // },
                                {
                                    name: "FlappyFinch",
                                    file: "https://nate314.github.io/nathangawith/applications/webApplications/flappyFinch.html",
                                    description: "Flappy Finch is a spin off of Flappy Bird created using javascipt. There is"
                                    + " currently no collision code in place, so there is no way for the game to end. I wrote"
                                    + " this to learn how to do an animation using a javscript canvas."
                                },
                                {
                                    name: "FloatyStars",
                                    file: "https://nate314.github.io/nathangawith/applications/webApplications/floatyStars.html",
                                    description: "Floaty Stars is a simple application that I built to learn how to do 2D"
                                    + " animations in javascript."
                                },
                                {
                                    name: "GroupCreator",
                                    file: "webapplications/groupcreator",
                                    description: "Group Creator is a great application to use if you want to create random"
                                    + " groups of people and want to do it in an efficient way using pure computer randomness."
                                },
                                {
                                    name: "HTMLSandbox",
                                    file: "webapplications/htmlsandbox",
                                    description: "HTML Sandbox is a great application to use if you want to learn how to code"
                                    + " in HTML but don't have a way of editing code on your computer or just want to try"
                                    + " something out real quick in your browser."
                                },
                                {
                                    name: "MultiplicationTable",
                                    file: "webapplications/multiplicationtable",
                                    description: "Multiplication Table is pretty much self explanitory. Enter a number between"
                                    + " 0 and 120 and a multiplication table will be generated with that size."
                                },
                                {
                                    name: "NathanGawithWebsite",
                                    file: "webapplications/nathangawithwebsite",
                                    description: "This website is technically a web application, so I included it in this list."
                                },
                                {
                                    name: "Say2",
                                    file: "webapplications/say2",
                                    description: "Say2 is a simple program that takes a number as input and outputs the english"
                                    + " text for that number. For example: if you type in \"123\", the program will output \"one"
                                    + " hundred twenty three\". Say2 was originally a challenge that many of the programmers on"
                                    + " my robotics team completed as part of java training. Say2 is the first web application"
                                    + " that I have written in JavaScript, which even though JavaScript sounds like Java, the"
                                    + " two languages are almost just as similar to each other as a car is to carpet."
                                }
                            ]
                        },
                        {
                            name: "AndroidApplications",
                            description: "You can downlad any of these java applications by clicking on the name "
                              + "of the application below, or you can view a list of all of the applications and descriptions ",
                            link: "applications/android",
                            "apps": [{
                                name: "LiveWallpaper",
                                file: "LiveWallpaper.apk",
                                description: "Live Wallpaper is my first fully functional android application that I have written."
                                + " This live wallpaper changes color based on what direction your phone is facing using all three"
                                + " angles available (pitch, roll, and azmuth) from the standard accelerometer found in most phones."
                                + " You can use this live wallpaper by downloading and installing the apk file and then selecting"
                                + " \"Live Wallpaper\" as your live wallpaper for your phone or tablet."
                            }]
                        }
                    ]
                },
                {
                    name: "OtherPages",
                    subpages: [{
                        name: "Videos",
                        videos: [
                            {
                                title: "Timelapse - Cube",
                                link: "https://www.youtube.com/embed/eBCUe4jSPQQ",
                                description: "This is my favorite timelapse I have made. It shows a 3x3x3 puzzle cube \"solving"
                                + " itself\". I accomplished this by taking a picture of the cube every quarter turn."
                            },
                            {
                                title: "Timelapse - Rubik's",
                                link: "https://www.youtube.com/embed/EtycVB_mPnQ",
                                description: "This is the first timelapse video I ever made. This is also a video of a cube"
                                + " solving itself, but this one doesn't look as nice as the one above because I only took"
                                + " one picture for each turn. I also thought it would be a good idea to show the clock so"
                                + " that you can see how long it took."
                            },
                            {
                                title: "Mosaic - MVTV",
                                link: "https://www.youtube.com/embed/hD42xobUROM",
                                description: "I was interviewed about my puzzle cube collection and hobby while in high school,"
                                + " so I made this mosaic for the high school broadcasting class to use as a nice outro for the"
                                + " interview."
                            },
                            {
                                title: "Mosaic - US Flag",
                                link: "https://www.youtube.com/embed/V4cVGX8jyfI",
                                description: "This was probably the easiest mosaic I made as stripes are easy for anyone to make"
                                + " with cubes whether or not you know how to solve a puzzle cube."
                            },
                            {
                                title: "Dream Home - Ground Floor",
                                link: "https://www.youtube.com/embed/9rEE0PjNMA4",
                                description: "In my \"Architectural Design\" course in high school, we designed our dream home"
                                + " in autocad and then made a 3D rendering. This is a video showing walking around the ground floor."
                            },
                            {
                                title: "Dream Home - Basement",
                                link: "https://www.youtube.com/embed/cDsXrYSNA8c",
                                description: "In my \"Architectural Design\" course in high school, we designed our dream home"
                                + " in autocad and then made a 3D rendering. This is a video showing walking around the basement."
                            },
                            {
                                title: "Typling Bot",
                                link: "https://www.youtube.com/embed/UzCBnGSdWAE",
                                description: "As a computer science student, a friend of mine challenged me to a typing contest."
                                + " I lost, so I thought it would be fun to code a bot to play for me. As you can see in this"
                                + " video, it isn't actually very fast."
                            },
                            {
                                title: "Clash Royale Strategy",
                                link: "https://www.youtube.com/embed/gLKssL0FN98",
                                description: "I used to play Clash Royale a lot, and this was my favorite strategy to use in a"
                                + " two on two battle."
                            }
                        ],
                    }]
                },
                {
                    name: "How I Created This Website",
                    description: "Here you can view the code behind this website."
                }
            ]
        }
    }
};