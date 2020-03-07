const text = "Maandag 10-02-2020 Geen lesDinsdag 11-02-202009:00 - 17:15TijdVakLokaalDocent09:00 -10:00LLB0.317Bootsma10:00 -10:30Lesvrij10:30 -11:30NED0.306Zwieten, van11:30 -12:30OFF0.323Buld12:30 -13:00Lesvrij13:00 -15:00PRG1.032Jong, de15:00 -15:15Lesvrij15:15 -17:15SOMonbekendEeftinkWoensdag 12-02-202009:00 - 12:30TijdVakLokaalDocent09:00 -10:00SQL1.023Bonte10:00 -10:30Lesvrij10:30 -11:30SQL1.023Bonte11:30 -12:30ENG1.030Olst, vanDonderdag 13-02-202011:30 - 15:00TijdVakLokaalDocent11:30 -12:30BEP0.325Pierik12:30 -13:00Lesvrij13:00 -14:00BEP0.325Pierik14:00 -15:00WED1.032Jong, deVrijdag 14-02-202010:30 - 16:15TijdVakLokaalDocent10:30 -11:30NED1.021Zwieten, van11:30 -12:30PRG1.032Jong, de12:30 -13:00Lesvrij13:00 -14:00PRG1.032Jong, de14:00 -15:00HWU1.023Bonte15:00 -15:15Lesvrij15:15 -16:15HWU1.023Bonte";
const text2 = "Maandag 02-03-202008:30 - 12:30TijdVakLokaalDocent08:30 -09:00SLB1.023Bonte09:00 -10:00REK0.325Pierik10:00 -10:30Lesvrij10:30 -11:30ENG1.030Olst, van11:30 -12:30SQL1.023BonteDinsdag 03-03-202009:00 - 17:15TijdVakLokaalDocent09:00 -10:00LLB0.317Bootsma10:00 -10:30Lesvrij10:30 -11:30NED0.306Zwieten, van11:30 -12:30OFF0.323Buld12:30 -13:00Lesvrij13:00 -15:00PRG1.032Jong, de15:00 -15:15Lesvrij15:15 -17:15SOMonbekendEeftinkWoensdag 04-03-202008:30 - 12:30TijdVakLokaalDocent08:30 -09:00SLB1.023Bonte09:00 -10:00WED1.032Jong, de10:00 -10:30Lesvrij10:30 -11:30SQL1.023Bonte11:30 -12:30ENG1.030Olst, vanDonderdag 05-03-202011:30 - 15:00TijdVakLokaalDocent11:30 -12:30BEP0.325Pierik12:30 -13:00Lesvrij13:00 -14:00BEP0.325Pierik14:00 -15:00WED1.032Jong, deVrijdag 06-03-202010:30 - 16:15TijdVakLokaalDocent10:30 -11:30NED1.021Zwieten, van11:30 -12:30PRG1.032Jong, de12:30 -13:00Lesvrij13:00 -14:00PRG1.032Jong, de14:00 -15:00HWU1.023Bonte15:00 -15:15Lesvrij15:15 -16:15HWU1.023Bonte";
const DaysO = {
    one: "Maandag",
    two: "Dinsdag",
    three: "Woensdag",
    four: "Donderdag",
    five: "Vrijdag"
}

const DaysA = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];

let counter = 0;
let order = ["tijd", "vak", "lokaal", "Docent"]
var rooster = [];
var rooster2 = [];
let maandag = [];

/**
 *  This function extract all text from one day
 *
 *  @param {String} Rooster text to extract from
 *  @param {String} Day day to start extracting from
 *
 * @return {String} Returns a string from the first occurence of the day till the next day
 */


// Big-O notation is O(n)
function getDay(day, r) {
    let roosterText;
    if (r == 1) {
        roosterText = text;
    }
    if (r == 2) {
        roosterText = text2;
    }

    let Nday = NextDay(day);
    // For every letter in the rooster
    for (let i = 0; i < roosterText.length; i++) {
        if (roosterText.substr(i, day.length) == day) {
            // console.log(counter);
            // console.log(Nday);
            // console.log(roosterText.substr(i, Nday.length));
            while (roosterText.substr(counter, Nday.length) != Nday) {
                // console.log(roosterText.substr(counter, Nday.length));
                counter++;
            }
            console.log(roosterText.substr(i, counter - i));
            return roosterText.substr(i, counter - i);
        }
    }
}

function NextDay(day) {
    let n = DaysA.indexOf(day);
    if ((n + 1) == DaysA.length) {
        // Be cautious óf the variable name
        return text.endsWith();
    }
    return DaysA[n + 1];
}

function getHours(day) {
    for (let i = 0; i < text.length; i++) {
        if (text[i] == "0" && text[i + 2] == ":") {
            console.log(text.substr(i, 13))
        }
    }
}

function fillRooster(rooster) {
    for (let i = 0; i < DaysA.length; i++) {
        rooster[i] = getDay(DaysA[i], 1);
        // rooster[i] = getDay(DaysA[i], 2);
    }
}

function splitLessons(day) {

}

function parseDay(day) {

}

function logTest() {
    console.log("Rooster 8AA1");
    fillRooster(rooster);
    console.log("Rooster 9AA1");
    fillRooster(rooster2);

   // console.log(rooster);
   // console.log(rooster2);
}

// Old input:
// getDay(text, Days.two);
// output:
// Maandag 10-02-2020 Geen les


// THIS IS WORKING
// Wanted input:
// getDay(text, Days.one);
// output (stays the same):
// Maandag 10-02-2020 Geen les
// getDay(text, DaysA[0]);