/* eslint @typescript-eslint/no-explicit-any: "off" */
export interface MatchStage {
  $match: { [key: string]: any };
}

export interface GroupAccumulator {
  $sum?: any;
  $avg?: any;
  $first?: any;
  $last?: any;
  $max?: any;
  $min?: any;
  $push?: any;
  $addToSet?: any;
}

export interface GroupStage {
  $group: {
    _id: string | number | object;
    [key: string]:
      | GroupAccumulator
      | string
      | number
      | object
      | boolean
      | null
      | undefined;
  };
}

export type ProjectFieldSpecifier = 0 | 1 | { [key: string]: 0 | 1 };

export interface ProjectStage {
  $project: {
    [key: string]: ProjectFieldSpecifier | object;
  };
}

export interface SortStage {
  $sort: { [key: string]: 1 | -1 };
}

export interface LimitStage {
  $limit: number;
}

export interface SkipStage {
  $skip: number;
}

export interface UnwindStage {
  $unwind:
    | string
    | {
        path: string;
        includeArrayIndex?: string;
        preserveNullAndEmptyArrays?: boolean;
      };
}

export interface LookupStage {
  $lookup: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  };
}

export interface SampleStage {
  $sample: { size: number };
}

export interface ReplaceRootStage {
  $replaceRoot: { newRoot: object };
}

export interface RedactStage {
  $redact: RedactExpression;
}

export type RedactExpression = {
  $cond: {
    if: any;
    then: RedactExpression | any;
    else: RedactExpression | any;
  };
};

export interface FacetStage {
  $facet: { [key: string]: Array<object> };
}

export interface GeoNearStage {
  $geoNear: {
    near: object;
    [key: string]: any;
  };
}

export interface GraphLookupStage {
  $graphLookup: {
    from: string;
    startWith: any;
    connectFromField: string;
    connectToField: string;
    as: string;
    [key: string]: any;
  };
}

export interface AddFieldsStage {
  $addFields: { [key: string]: any };
}

export type AggregationStage =
  | AddFieldsStage
  | GraphLookupStage
  | GeoNearStage
  | FacetStage
  | RedactStage
  | ReplaceRootStage
  | SampleStage
  | LookupStage
  | UnwindStage
  | SkipStage
  | LimitStage
  | SortStage
  | ProjectStage
  | GroupStage
  | MatchStage;
