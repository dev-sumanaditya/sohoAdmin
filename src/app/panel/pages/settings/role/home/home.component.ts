import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sec = null;
  public selectedRole = null;
  createRoleForm: FormGroup;
  createResourceForm: FormGroup;

  public resources = [
    {
      name: 'Admin',
      value: 'admin'
    },
    {
      name: 'Role',
      value: 'role'
    },
    {
      name: 'Permission',
      value: 'permission'
    },
    {
      name: 'Instructor',
      value: 'instructor'
    },
    {
      name: 'Course',
      value: 'course'
    },
  ];

  public actionsData = [
    {
      value: 'create',
      name: 'Create'
    },
    {
      value: 'read',
      name: 'Read'
    },
    {
      value: 'update',
      name: 'Update'
    },
    {
      value: 'delete',
      name: 'Delete'
    }
  ];

  public roles = [];

  public resourcesDB = [];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.createRoleForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      permissions: this.fb.array([]),
      currentPermission: this.createPermissionGroup()
    });

    this.createResourceForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.getRoles();
    this.getAllResources();
  }

  get actionsFormArray() {
    return (this.createRoleForm.get('currentPermission').get('actions') as FormArray);
  }

  selected(data) {
    this.selectedRole = null;
    this.sec = data;
  }

  selectRole(data) {
    this.sec = 1;
    this.selectedRole = data;
  }

  getRoles() {
    this.http.get<any>(environment.apiUrl + '/role').subscribe(({ data }) => {
      this.roles = data;
    });
  }

  goBack() {
    if (this.sec) {
      this.sec = null;
    } else {
      this.location.back();
    }
  }

  addPermission() {
    this.permissionsControl.push(this.createRoleForm.get('currentPermission'));
    this.createRoleForm.setControl('currentPermission', this.createPermissionGroup());
  }

  get permissionsControl() {
    return (this.createRoleForm.get('permissions') as FormArray);
  }

  get permissionsArray() {
    return (this.createRoleForm.get('permissions') as FormArray).value;
  }

  // getActionShortCut(actions: boolean[]) {
  //   return actions.reduce((str, action, i) => {
  //     if (!action) { return str; }

  //     str += this.actionsData[i].name[0] + ' ';
  //     return str;
  //   }, '');
  // }

  getActionShortCut(actions: Array<{action: boolean, permissionType: string}>) {
    return actions.reduce((str, action, i) => {
      if (!action.action) { return str; }

      str += this.actionsData[i].name[0] + `[${action.permissionType[0]}] `;
      return str;
    }, '');
  }

  createPermissionGroup() {
    const group = this.fb.group({
      resource: this.fb.control(null, [Validators.required]),
      actions: this.fb.array([], [validateActionsData]),
      // permissionType: this.fb.control('', [Validators.required])
    });
    this.actionsData.forEach(action => {
      // (group.get('actions') as FormArray).push(new FormControl(false));
      (group.get('actions') as FormArray).push(this.fb.group({action: this.fb.control(false), permissionType: this.fb.control('own')}));

    });
    // group.reset();
    return group;
  }

  removePermission(index: number) {
    this.permissionsControl.removeAt(index);
  }

  createRole() {
    const { currentPermission, ...data } = this.createRoleForm.value;

    // data.permissions = data.permissions.map(permission => {
    //   const actions = permission.actions.filter(action => !!action).map((act, i) => this.actionsData[i].value);
    //   return {
    //     actions,
    //     resource: permission.resource.value
    //   };
    // });

    data.permissions = data.permissions.map(permission => {
      const actions = permission.actions
      .map((action: {action: boolean, permissionType: string}, i) => {
        return {
          selected: action.action,
          action: this.actionsData[i].value,
          permissionType: action.permissionType
        };
      }).filter(o => o.selected).map(o => { delete o.selected; return o; });
      return {
        actions,
        resource: permission.resource.name
      };
    });

    console.log(data);
    this.http.post(environment.apiUrl + '/role', data)
      .subscribe(
        res => {
          console.log(res);
        }
      );

  }

  createResouce() {
    this.http.post(environment.apiUrl + '/permission', {resource: this.createResourceForm.get('name').value.toLowerCase()})
      .subscribe(
        res => {
          this.createResourceForm.reset();
          this.getAllResources();
        }
      );
  }

  getAllResources() {
    this.http.get<any>(environment.apiUrl + '/permission/resource')
    .subscribe(
      ({data}) => {
        this.resourcesDB = data;
      }
    );
  }

}

export function validateActionsData(formArray: FormArray) {

  const valid = formArray.controls.some((group: FormGroup) => {
    return group.controls.action.value === true;
  });
  return valid ? null : { error: 'Select atleast one action' };

}
