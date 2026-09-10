import { memberService } from "./member/member.service";
import type { MemberDocument, DocumentCategory, Pharmacist } from "@/types/member";

export interface UploadDocumentParams {
  name: string;
  category: DocumentCategory;
  file: File;
  expiryDate?: string;
  pharmacistValues?: Omit<Pharmacist, "memberId" | "documentId">;
}

export const documentsService = {
  async getDocuments(): Promise<MemberDocument[]> {
    const record = await memberService.getRecord();
    return record?.documents ?? [];
  },

  async uploadDocument(params: UploadDocumentParams): Promise<MemberDocument> {
    return memberService.uploadDocument(params);
  },

  async deleteDocument(documentId: string): Promise<void> {
    return memberService.deleteDocument(documentId);
  },
};
