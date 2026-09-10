$files = Get-ChildItem -Path "src\modules" -Recurse -Filter "*.tsx" | Where-Object { Select-String -Path $_.FullName -Pattern "@/features/member/" -Quiet }
foreach ($f in $files) {
  $content = Get-Content $f.FullName -Raw
  $content = $content -replace '@/features/member/MemberShell', '@/layouts/AuthenticatedPortalLayout'
  $content = $content -replace '@/features/member/UnionShopIdentity', '@/components/common/UnionShopIdentity'
  $content = $content -replace '@/features/member/OwnerDialog', '@/components/common/OwnerDialog'
  $content = $content -replace '@/features/member/SectionCard', '@/components/common/SectionCard'
  $content = $content -replace '@/features/member/ShopAddressForm', '@/components/common/ShopAddressForm'
  $content = $content -replace '@/features/member/PharmacistDialog', '@/components/common/PharmacistDialog'
  $content = $content -replace '@/features/member/EmployeeDialog', '@/components/common/EmployeeDialog'
  $content = $content -replace '@/features/member/DocumentUploadDialog', '@/components/common/DocumentUploadDialog'
  $content = $content -replace '@/features/member/DocumentViewDialog', '@/components/common/DocumentViewDialog'
  $content = $content -replace '@/features/member/LicenceCard', '@/components/common/LicenceCard'
  $content = $content -replace '@/features/member/StatusBadge', '@/components/common/StatusBadge'
  Set-Content $f.FullName $content -NoNewline
  Write-Output ("Fixed: " + $f.FullName)
}
