import {
  Car,
  Truck,
  Bike,
  Footprints,
  HardHat,
  Stethoscope,
  HeartCrack,
  PawPrint,
  type LucideIcon,
} from "lucide-react";

export type CaseType = {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  intro: string;
  causes: string[];
  injuries: string[];
  compFactors: string[];
  nextSteps: string[];
};

export const CASE_TYPES: CaseType[] = [
  {
    slug: "car-accidents",
    icon: Car,
    title: "Car Accidents",
    tagline: "Rear-end, hit-and-run, rideshare and multi-vehicle collisions.",
    intro:
      "Car crashes are the most common source of personal injury claims in America — and also the most commonly underpaid. Insurers use quick, lowball settlement offers hoping you sign before you understand the full cost of your injuries. An experienced attorney knows exactly what your claim is worth and how to force the insurer to pay it.",
    causes: [
      "Distracted or texting drivers",
      "Speeding, weaving, and aggressive driving",
      "Drunk or drug-impaired driving",
      "Running red lights and stop signs",
      "Rear-end collisions in stop-and-go traffic",
      "Poor road conditions or defective vehicle parts",
    ],
    injuries: [
      "Whiplash, neck and back injuries",
      "Concussions and traumatic brain injuries",
      "Fractures and broken bones",
      "Soft-tissue damage and chronic pain",
      "Spinal cord injury and, in severe cases, paralysis",
    ],
    compFactors: [
      "Current and future medical expenses",
      "Lost wages and reduced earning capacity",
      "Vehicle damage and out-of-pocket costs",
      "Pain, suffering, and loss of enjoyment of life",
      "Punitive damages where gross negligence applies",
    ],
    nextSteps: [
      "Call 911 and get a police report — never skip documentation",
      "Photograph the scene, vehicles, injuries, and road conditions",
      "Collect the other driver's insurance and contact details",
      "See a doctor within 72 hours even if you feel fine",
      "Get a free case review before speaking to any insurance adjuster",
    ],
  },
  {
    slug: "truck-accidents",
    icon: Truck,
    title: "Truck Accidents",
    tagline: "18-wheeler and commercial vehicle crashes with severe injuries.",
    intro:
      "Collisions with commercial trucks involve catastrophic forces and complex liability. Multiple parties may be responsible — the driver, the trucking company, cargo loaders, maintenance contractors — and each has an insurer working against you. These cases demand attorneys with the resources to go toe-to-toe with corporate legal teams.",
    causes: [
      "Driver fatigue and hours-of-service violations",
      "Overloaded or improperly secured cargo",
      "Poor brake, tire, or equipment maintenance",
      "Inadequate driver training or screening",
      "Speeding and following too closely",
      "Distracted driving from dispatch pressure",
    ],
    injuries: [
      "Traumatic brain injuries",
      "Multiple fractures and crush injuries",
      "Internal organ damage and internal bleeding",
      "Severe burns and disfigurement",
      "Spinal cord damage, often permanent",
    ],
    compFactors: [
      "Long-term medical care and rehabilitation costs",
      "Trucking company negligence and policy violations",
      "Electronic logging device (ELD) and black-box evidence",
      "Lifetime lost earning capacity",
      "Corporate punitive damages for safety violations",
    ],
    nextSteps: [
      "Request the police report and preserve all scene evidence",
      "Do not give recorded statements to any trucking insurer",
      "Act fast — trucking companies may destroy records legally within months",
      "Track every medical visit, prescription, and expense",
      "Get an attorney experienced specifically in FMCSA regulations",
    ],
  },
  {
    slug: "motorcycle-crashes",
    icon: Bike,
    title: "Motorcycle Crashes",
    tagline: "Riders deserve full compensation — bias against bikers ends here.",
    intro:
      "Motorcyclists suffer disproportionate injuries in crashes that would barely harm a car occupant — and jurors and insurers often carry unfair bias against riders. A strong attorney counters that bias with crash reconstruction, witness testimony, and hard evidence of the driver's fault.",
    causes: [
      "Left-turning cars crossing a rider's path",
      "Drivers failing to see motorcycles at intersections",
      "Lane-change collisions caused by blind spots",
      "Road hazards — gravel, potholes, debris",
      "Dooring by parked vehicles",
      "Impaired or distracted drivers",
    ],
    injuries: [
      "Road rash requiring skin grafts",
      "Compound fractures",
      "Head and brain injuries despite helmet use",
      "Nerve damage and permanent mobility loss",
      "Facial and dental trauma",
    ],
    compFactors: [
      "Extent of protective gear worn and available",
      "Crash reconstruction and fault analysis",
      "Long-term physical therapy needs",
      "Customized motorcycle and gear replacement",
      "Documented pain and suffering",
    ],
    nextSteps: [
      "Prioritize medical treatment — adrenaline masks serious injuries",
      "Preserve your helmet, gear, and damaged bike as evidence",
      "Photograph the scene before vehicles are moved if possible",
      "Decline the insurer's first settlement offer — always",
      "Speak with a motorcycle-specific injury attorney early",
    ],
  },
  {
    slug: "slip-and-fall",
    icon: Footprints,
    title: "Slip & Fall",
    tagline: "Unsafe property conditions that cause serious injury.",
    intro:
      "Property owners have a legal duty to keep their premises reasonably safe. When they ignore spills, broken stairs, poor lighting, or hazards they knew about, and you're hurt as a result, you can hold them financially accountable — but these cases are won or lost on evidence gathered quickly.",
    causes: [
      "Wet or freshly mopped floors without warning signs",
      "Uneven pavement, potholes, and broken steps",
      "Inadequate lighting in stairwells and lots",
      "Icy or unshoveled walkways",
      "Loose handrails and torn carpeting",
      "Cluttered or obstructed walkways in stores",
    ],
    injuries: [
      "Hip fractures — especially dangerous for older adults",
      "Wrist, arm, and ankle breaks from impact",
      "Head injuries from striking the ground",
      "Back and spinal injuries",
      "Torn ligaments requiring surgery",
    ],
    compFactors: [
      "How long the hazard existed before your fall",
      "The property owner's inspection and maintenance records",
      "Whether warning signs were present",
      "Security camera footage of the incident",
      "Severity and permanence of your injuries",
    ],
    nextSteps: [
      "Report the fall to the property owner or manager immediately",
      "Demand a written incident report and keep a copy",
      "Photograph the exact hazard and surrounding area right away",
      "Identify witnesses and get their contact information",
      "Avoid giving statements to the property's insurance company",
    ],
  },
  {
    slug: "workplace-injury",
    icon: HardHat,
    title: "Workplace Injury",
    tagline: "Construction sites, factories, and unsafe working conditions.",
    intro:
      "Workers' compensation covers basic medical bills, but it often falls far short of what a serious workplace injury truly costs — and in many cases you may also have a third-party claim against equipment makers, contractors, or negligent parties beyond your employer.",
    causes: [
      "Falls from scaffolding, ladders, and heights",
      "Struck-by incidents with vehicles or falling objects",
      "Forklift and heavy machinery accidents",
      "Electrocution and burns",
      "Repetitive strain and overexertion",
      "Failure to provide required safety equipment",
    ],
    injuries: [
      "Fractures and crush injuries to hands and feet",
      "Falls causing head trauma and spinal damage",
      "Amputations and permanent disability",
      "Burns and respiratory damage from chemical exposure",
      "Hearing and vision loss",
    ],
    compFactors: [
      "Third-party liability beyond workers' comp",
      "OSHA violations and safety record of the site",
      "Permanent impairment ratings",
      "Retraining costs if you cannot return to your trade",
      "Employer retaliation damages where applicable",
    ],
    nextSteps: [
      "Report the injury to your employer in writing immediately",
      "Request copies of any incident and OSHA logs",
      "Photograph the equipment and conditions involved",
      "Note witness names — coworkers may move on quickly",
      "Explore third-party claims before accepting any comp settlement",
    ],
  },
  {
    slug: "medical-malpractice",
    icon: Stethoscope,
    title: "Medical Malpractice",
    tagline: "Surgical errors, misdiagnosis, and negligence by providers.",
    intro:
      "We trust medical professionals with our lives. When a doctor, nurse, or hospital deviates from accepted standards of care and you're harmed as a result, the law entitles you to compensation — though these technically demanding cases require expert review and should be evaluated early.",
    causes: [
      "Misdiagnosis or delayed diagnosis",
      "Surgical errors and wrong-site surgery",
      "Medication and anesthesia errors",
      "Birth injuries to mother or child",
      "Failure to monitor patient deterioration",
      "Hospital communication and charting failures",
    ],
    injuries: [
      "Worsened condition from delayed treatment",
      "Permanent organ or nerve damage",
      "Infections and sepsis from negligence",
      "Birth injuries including cerebral palsy",
      "Unnecessary additional surgeries",
    ],
    compFactors: [
      "Expert testimony on the standard of care",
      "Full lifetime cost of corrective care",
      "Loss of income and career impact",
      "Pain and diminished quality of life",
      "Strict state damage caps and filing deadlines",
    ],
    nextSteps: [
      "Obtain your complete medical records immediately",
      "Keep a timeline of every appointment and conversation",
      "Mind strict deadlines — malpractice windows are shortest of all",
      "Never alert the provider of intent before consulting counsel",
      "Have your records reviewed by a malpractice attorney",
    ],
  },
  {
    slug: "wrongful-death",
    icon: HeartCrack,
    title: "Wrongful Death",
    tagline: "Compassionate, relentless advocacy for surviving families.",
    intro:
      "No amount of money can replace a loved one — but holding the responsible party accountable can secure your family's financial future and deliver the accountability they fought to avoid. Wrongful death claims recover both the family's losses and the estate's losses.",
    causes: [
      "Fatal car, truck, and motorcycle collisions",
      "Deadly workplace and construction accidents",
      "Medical negligence and misdiagnosis",
      "Defective products and medications",
      "Unsafe premises and criminal acts",
    ],
    injuries: [
      "Loss of financial support for dependents",
      "Funeral and burial expenses",
      "Final medical costs before passing",
      "Loss of companionship and guidance",
      "Estate administration burdens",
    ],
    compFactors: [
      "Deceased's lifetime earning capacity",
      "Age and number of surviving dependents",
      "Degree of negligence or recklessness involved",
      "Available insurance coverage and assets",
      "State-specific wrongful death statutes",
    ],
    nextSteps: [
      "Appoint a personal representative for the estate",
      "Preserve all records related to the death",
      "Avoid early settlements from insurers — they exploit grief",
      "Track every expense the loss has caused",
      "Consult a wrongful death attorney before signing anything",
    ],
  },
  {
    slug: "dog-bites-and-more",
    icon: PawPrint,
    title: "Dog Bites & More",
    tagline: "Animal attacks, burns, pedestrian injuries, and more.",
    intro:
      "If it happened because someone else was careless, it's likely a valid personal injury claim — even when it doesn't fit a neat category. Dog attacks, pedestrian strikes, burns, defective products, and pedestrian accidents all follow the same principle: negligence has a price, and it isn't yours to pay.",
    causes: [
      "Dog attacks from known aggressive animals",
      "Owners violating leash laws",
      "Drivers striking pedestrians in crosswalks",
      "Defective consumer products",
      "Exposure to hazardous chemicals",
      "Swimming pool and recreational accidents",
    ],
    injuries: [
      "Puncture wounds, lacerations, and scarring",
      "Nerve and tendon damage to hands and face",
      "Infections including rabies risk",
      "Fractures and head trauma from knock-downs",
      "Lasting psychological trauma, especially in children",
    ],
    compFactors: [
      "Owner knowledge of prior aggression",
      "Local leash-law and ordinance violations",
      "Plastic surgery and scar-revision costs",
      "Counseling needs for trauma recovery",
      "Homeowner's or renter's insurance coverage",
    ],
    nextSteps: [
      "Seek immediate medical care and report the bite to animal control",
      "Photograph wounds throughout the healing process",
      "Get the owner's information and vaccination records",
      "Identify prior complaints against the animal if possible",
      "Review your options before insurers minimize the scarring",
    ],
  },
];

export function getCaseType(slug: string): CaseType | undefined {
  return CASE_TYPES.find((c) => c.slug === slug);
}
