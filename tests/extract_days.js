const text = "Maandag 10-02-2020 Geen lesDinsdag 11-02-202009:00 - 17:15TijdVakLokaalDocent09:00 -10:00LLB0.317Bootsma10:00 -10:30Lesvrij10:30 -11:30NED0.306Zwieten, van11:30 -12:30OFF0.323Buld12:30 -13:00Lesvrij13:00 -15:00PRG1.032Jong, de15:00 -15:15Lesvrij15:15 -17:15SOMonbekendEeftinkWoensdag 12-02-202009:00 - 12:30TijdVakLokaalDocent09:00 -10:00SQL1.023Bonte10:00 -10:30Lesvrij10:30 -11:30SQL1.023Bonte11:30 -12:30ENG1.030Olst, vanDonderdag 13-02-202011:30 - 15:00TijdVakLokaalDocent11:30 -12:30BEP0.325Pierik12:30 -13:00Lesvrij13:00 -14:00BEP0.325Pierik14:00 -15:00WED1.032Jong, deVrijdag 14-02-202010:30 - 16:15TijdVakLokaalDocent10:30 -11:30NED1.021Zwieten, van11:30 -12:30PRG1.032Jong, de12:30 -13:00Lesvrij13:00 -14:00PRG1.032Jong, de14:00 -15:00HWU1.023Bonte15:00 -15:15Lesvrij15:15 -16:15HWU1.023Bonte";

let counter = 0;

let order = ["tijd", "vak", "lokaal", "Docent"]

let DaysO = {
    one: "Maandag",
    two: "Dinsdag",
    three: "Woensdag",
    four: "Donderdag",
    five: "Vrijdag"
}

let DaysA = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"];
let rooster = [];


/**
 *  This function extract all text from one day
 *
 *  @param {String} Rooster text to extract from
 *  @param {String} Day day to start extracting from
 *
 * @return {String} Returns a string from the first occurence of the day till the next day
 */


// Big-O notation is O(n)
function getDay(roosterText, day) {
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
            counter = 0;
        }
    }
}

function NextDay(day) {
    let n = DaysA.indexOf(day);
    if((n + 1) == DaysA.length){
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
        rooster[i] = getDay(text, DaysA[i]);
    }
}


console.log(DaysA);

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