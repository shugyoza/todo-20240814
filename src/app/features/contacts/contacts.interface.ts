export class Email {
  public home?: string;
  public work?: string;
  public school?: string;
  public iCloud?: string;
  public other?: string;

  constructor(input: Email) {
    this.home = input.home;
    this.work = input.work;
    this.school = input.school;
    this.iCloud = input.iCloud;
    this.other = input.other;
  }
}

export class URL {
  homepage?: string;
  home?: string;
  work?: string;
  school?: string;
  other?: string;

  constructor(input: URL) {
    this.homepage = input.homepage;
    this.home = input.home;
    this.work = input.work;
    this.school = input.school;
    this.other = input.other;
  }
}

export class Address {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;

  constructor(input: Address) {
    this.street1 = input.street1;
    this.street2 = input.street2;
    this.city = input.city;
    this.state = input.state;
    this.zip = input.zip;
    this.country = input.country;
  }
}

export class AddressType {
  home?: Address;
  work?: Address;
  school?: Address;
  other?: Address;
}

export interface Birthday {
  birthday: Date;
  chineseBirthday: Date;
}

export interface Anniversary {
  anniversary?: Date;
  other?: Date;
}

export interface RelatedName {
  mother?: string;
  father?: string;
  parent?: string;
  brother?: string;
  sister?: string;
  son?: string;
  daughter?: string;
  child?: string;
  friend?: string;
  spouse?: string;
  partner?: string;
  assistant?: string;
  manager?: string;
  other?: string; //
}

export interface SocialProfile {
  twitter?: string;
  facebook?: string;
  flickr?: string;
  linkedin?: string;
  myspace?: string;
  sinaWeibo?: string;
}
