export const places = [
  "Chitwan",
  "Kathmandu",
  "Hetauda",
  "Makwanpur",
  "Dhangadhi",
  "Jhapa",
  "Itahari",
  "Sindhuli",
  "Lalitpur",
  "Gandaki",
  "Nawalparasi",
] as const;

const districts: Record<(typeof places)[number], string> = {
  Chitwan: "Chitwan",
  Kathmandu: "Kathmandu",
  Hetauda: "Makwanpur",
  Makwanpur: "Makwanpur",
  Dhangadhi: "Kailali",
  Jhapa: "Jhapa",
  Itahari: "Sunsari",
  Sindhuli: "Sindhuli",
  Lalitpur: "Lalitpur",
  Gandaki: "Gandaki",
  Nawalparasi: "Nawalparasi",
};

export function districtFor(place: string) {
  return districts[place as (typeof places)[number]] ?? place;
}

export function dummyLogo(place: string) {
  return `/clients/dummy/${place.toLowerCase()}.svg`;
}
