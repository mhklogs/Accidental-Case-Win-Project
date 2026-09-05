export type UsState = {
  name: string;
  slug: string;
  code: string;
  cities: string[];
};

export const STATES: UsState[] = [
  {
    name: "Alabama",
    slug: "alabama",
    code: "AL",
    cities: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
  },
  {
    name: "Alaska",
    slug: "alaska",
    code: "AK",
    cities: ["Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka"],
  },
  {
    name: "Arizona",
    slug: "arizona",
    code: "AZ",
    cities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
  },
  {
    name: "Arkansas",
    slug: "arkansas",
    code: "AR",
    cities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
  },
  {
    name: "California",
    slug: "california",
    code: "CA",
    cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento"],
  },
  {
    name: "Colorado",
    slug: "colorado",
    code: "CO",
    cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
  },
  {
    name: "Connecticut",
    slug: "connecticut",
    code: "CT",
    cities: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"],
  },
  {
    name: "Delaware",
    slug: "delaware",
    code: "DE",
    cities: ["Wilmington", "Dover", "Newark", "Middletown", "Bear"],
  },
  {
    name: "Florida",
    slug: "florida",
    code: "FL",
    cities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg"],
  },
  {
    name: "Georgia",
    slug: "georgia",
    code: "GA",
    cities: ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah"],
  },
  {
    name: "Hawaii",
    slug: "hawaii",
    code: "HI",
    cities: ["Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu"],
  },
  {
    name: "Idaho",
    slug: "idaho",
    code: "ID",
    cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello"],
  },
  {
    name: "Illinois",
    slug: "illinois",
    code: "IL",
    cities: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"],
  },
  {
    name: "Indiana",
    slug: "indiana",
    code: "IN",
    cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
  },
  {
    name: "Iowa",
    slug: "iowa",
    code: "IA",
    cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
  },
  {
    name: "Kansas",
    slug: "kansas",
    code: "KS",
    cities: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"],
  },
  {
    name: "Kentucky",
    slug: "kentucky",
    code: "KY",
    cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
  },
  {
    name: "Louisiana",
    slug: "louisiana",
    code: "LA",
    cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
  },
  {
    name: "Maine",
    slug: "maine",
    code: "ME",
    cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
  },
  {
    name: "Maryland",
    slug: "maryland",
    code: "MD",
    cities: ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie"],
  },
  {
    name: "Massachusetts",
    slug: "massachusetts",
    code: "MA",
    cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
  },
  {
    name: "Michigan",
    slug: "michigan",
    code: "MI",
    cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"],
  },
  {
    name: "Minnesota",
    slug: "minnesota",
    code: "MN",
    cities: ["Minneapolis", "St. Paul", "Rochester", "Bloomington", "Duluth"],
  },
  {
    name: "Mississippi",
    slug: "mississippi",
    code: "MS",
    cities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"],
  },
  {
    name: "Missouri",
    slug: "missouri",
    code: "MO",
    cities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"],
  },
  {
    name: "Montana",
    slug: "montana",
    code: "MT",
    cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"],
  },
  {
    name: "Nebraska",
    slug: "nebraska",
    code: "NE",
    cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
  },
  {
    name: "Nevada",
    slug: "nevada",
    code: "NV",
    cities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"],
  },
  {
    name: "New Hampshire",
    slug: "new-hampshire",
    code: "NH",
    cities: ["Manchester", "Nashua", "Concord", "Derry", "Rochester"],
  },
  {
    name: "New Jersey",
    slug: "new-jersey",
    code: "NJ",
    cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton"],
  },
  {
    name: "New Mexico",
    slug: "new-mexico",
    code: "NM",
    cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
  },
  {
    name: "New York",
    slug: "new-york",
    code: "NY",
    cities: ["New York", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
  },
  {
    name: "North Carolina",
    slug: "north-carolina",
    code: "NC",
    cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
  },
  {
    name: "North Dakota",
    slug: "north-dakota",
    code: "ND",
    cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
  },
  {
    name: "Ohio",
    slug: "ohio",
    code: "OH",
    cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  },
  {
    name: "Oklahoma",
    slug: "oklahoma",
    code: "OK",
    cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"],
  },
  {
    name: "Oregon",
    slug: "oregon",
    code: "OR",
    cities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro"],
  },
  {
    name: "Pennsylvania",
    slug: "pennsylvania",
    code: "PA",
    cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
  },
  {
    name: "Rhode Island",
    slug: "rhode-island",
    code: "RI",
    cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"],
  },
  {
    name: "South Carolina",
    slug: "south-carolina",
    code: "SC",
    cities: ["Columbia", "Charleston", "North Charleston", "Mount Pleasant", "Rock Hill"],
  },
  {
    name: "South Dakota",
    slug: "south-dakota",
    code: "SD",
    cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
  },
  {
    name: "Tennessee",
    slug: "tennessee",
    code: "TN",
    cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
  },
  {
    name: "Texas",
    slug: "texas",
    code: "TX",
    cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
  },
  {
    name: "Utah",
    slug: "utah",
    code: "UT",
    cities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
  },
  {
    name: "Vermont",
    slug: "vermont",
    code: "VT",
    cities: ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"],
  },
  {
    name: "Virginia",
    slug: "virginia",
    code: "VA",
    cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Arlington"],
  },
  {
    name: "Washington",
    slug: "washington",
    code: "WA",
    cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
  },
  {
    name: "West Virginia",
    slug: "west-virginia",
    code: "WV",
    cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
  },
  {
    name: "Wisconsin",
    slug: "wisconsin",
    code: "WI",
    cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
  },
  {
    name: "Wyoming",
    slug: "wyoming",
    code: "WY",
    cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
  },
  {
    name: "District of Columbia",
    slug: "district-of-columbia",
    code: "DC",
    cities: ["Washington"],
  },
];

export const SITE_URL = "https://accidentcarehelpline.com";

export function getState(slug: string): UsState | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function toTitleCase(name: string): string {
  return name
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}