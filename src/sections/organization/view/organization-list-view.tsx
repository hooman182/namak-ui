import type { Organization } from 'src/types/organization';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { OrganizationListTable } from '../organization-list-table';
import { OrganizationCreateUpdateDialog } from '../create-update-dialog';

// ----------------------------------------------------------------------

export function OrganizationListView() {
  const { organizations, deleteOrganization } = useData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

  const openCreate = useCallback(() => {
    setEditingOrg(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((org: Organization) => {
    setEditingOrg(org);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setEditingOrg(null);
  }, []);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          سازمان‌ها
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={openCreate}
        >
          افزودن سازمان
        </Button>
      </Box>

      <Card>
        <OrganizationListTable
          organizations={organizations}
          onEdit={openEdit}
          onDelete={deleteOrganization}
        />
      </Card>

      <OrganizationCreateUpdateDialog
        open={dialogOpen}
        onClose={closeDialog}
        editingOrg={editingOrg}
      />
    </DashboardContent>
  );
}
