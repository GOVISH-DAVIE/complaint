export type Complaints = ComplaintsInterface[]

export interface ComplaintsInterface{
  id: string
  title: string
  description: string
  status: string
  longitude: number
  latitude: number
  image: string
  created_at: string
  updated_at: string
  user: string
}

export type AllComments = CommentsInterface[]

export interface CommentsInterface {
  id: string
  comment: string
  created_at: string
  updated_at: string
  complaint: string
  user: string
}