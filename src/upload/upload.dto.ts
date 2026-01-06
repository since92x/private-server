/** 角色类型 */
export enum SpeakRole {
  /** 助手 */
  Assistant = 1,
  /** 用户 */
  User = 2,
}

/** 所属任务下的演讲者索引 */
export enum TaskSpeakerIndex {
  /** 第一个(任务发音时) */
  Zero = 0,
  /** 第二个(用户录音时) */
  One = 1,
  /** 第三个(Chat发音时) */
  Two = 2,
}

/** 多媒体类型 */
export enum MediaType {
  /** 文本 */
  Text = 1,
  /** 图片 */
  Image = 2,
  /** 音频 */
  Audio = 3,
  /** 视频 */
  Video = 4,
}

/** 视频上传请求 DTO */
export class UploadVideoDto {
  /** 学习记录ID */
  learnRecordId: string;
  /** 任务ID */
  sectionTaskId: number;
  /** 任务索引 */
  taskSpeakerIndex: TaskSpeakerIndex;
  /** 角色类型 */
  speakerRole: SpeakRole;
  /** 视频切片索引，从 0 开始 */
  sliceIndex: number;
  /** 视频切片总数 */
  sliceTotal: number;
  /** 媒体类型 */
  mediaType: MediaType;
}

