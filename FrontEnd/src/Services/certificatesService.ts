import { INTEGRITY_CERTIFICATES_DUMMY } from "@dummy/integrityCertificates";
import {
  getCertificate,
  listCertificates,
  type IntegrityCertificate,
} from "@website/helpers/integrityCertificatesStore";

export const certificatesService = {
  async listForContributor(_contributorName?: string): Promise<IntegrityCertificate[]> {
    try {
      const local = listCertificates();
      if (local.length > 0) return local;
      return INTEGRITY_CERTIFICATES_DUMMY;
    } catch {
      return INTEGRITY_CERTIFICATES_DUMMY;
    }
  },

  async getById(id: string): Promise<IntegrityCertificate | undefined> {
    try {
      return getCertificate(id) ?? INTEGRITY_CERTIFICATES_DUMMY.find((c) => c.id === id);
    } catch {
      return INTEGRITY_CERTIFICATES_DUMMY.find((c) => c.id === id);
    }
  },
};
