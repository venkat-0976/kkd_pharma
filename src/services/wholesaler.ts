import { memberService } from "./member/member.service";
import type {
  BusinessProfile,
  MemberRecord,
  ExpiryAlert,
  ShopAddress,
  LicenceRecord,
  LicenceKind,
  NotificationPreferences,
} from "@/types/member";

export const wholesalerService = {
  async getRecord(): Promise<MemberRecord | null> {
    return memberService.getRecord();
  },

  async updateProfile(patch: Partial<BusinessProfile>): Promise<BusinessProfile> {
    return memberService.updateProfile(patch);
  },

  async saveAddress(address: Partial<ShopAddress>): Promise<ShopAddress> {
    return memberService.saveAddress(address);
  },

  async saveLicence(
    kind: LicenceKind,
    record: Partial<LicenceRecord>,
  ): Promise<LicenceRecord> {
    return memberService.saveLicence(kind, record);
  },

  async getAlerts(): Promise<ExpiryAlert[]> {
    return memberService.getAlerts();
  },

  async savePreferences(
    patch: Partial<NotificationPreferences>,
  ): Promise<NotificationPreferences> {
    return memberService.savePreferences(patch);
  },
};
