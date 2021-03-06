// TODO: lib-ui candidate
export interface IMetaTypeMeta {
  apiVersion: string;
  kind: string;
}

interface IObjectReference {
  apiVersion: string;
  kind: string;
  name: string;
  uid: string | undefined;
}

// TODO: lib-ui candidate
export interface IMetaObjectMeta {
  name: string;
  namespace: string;
  selfLink?: string;
  uid?: string;
  resourceVersion?: string;
  generation?: number;
  creationTimestamp?: string; // ISO timestamp
  annotations?: {
    'kubectl.kubernetes.io/last-applied-configuration': string; // JSON
  };
  ownerReferences?: IObjectReference[];
}

export interface ICR extends IMetaTypeMeta {
  metadata: IMetaObjectMeta;
}

export interface IStatusCondition {
  category: string;
  type: string;
  status: boolean;
  reason: string;
  message: string;
  lastTransitionTime: string; // ISO timestamp
}

export interface IVMwareObjRef {
  kind: string;
  id: string;
}

export interface INameNamespaceRef {
  name: string;
  namespace: string;
}
