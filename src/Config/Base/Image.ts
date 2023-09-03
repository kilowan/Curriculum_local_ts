export class Image {
  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }
  type: string;
  name: string;
  data?: string;
}
