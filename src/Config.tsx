export enum BuildType {
    DEV = "DEV",
    PRODUCTION = "PRODUCTION"
}

export class Config {
    static getBuildType(): BuildType {
        const build = process.env.BUILD;
        console.log(`BUILD: ${build}`);
        switch (build) {
            case "DEV":
                return BuildType.DEV;
            case "PRODUCTION":
                return BuildType.PRODUCTION;
            default:
                return BuildType.DEV;
        }
    }
}