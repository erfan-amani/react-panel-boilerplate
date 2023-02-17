// User Status
const StatusActive = {
  name: 'Active',
  value: 'ACTIVE',
};
const StatusBlock = {
  name: 'Block',
  value: 'BLOCK',
};
const InactiveBlock = {
  name: 'Inactive',
  value: 'INACTIVE',
};
// User Type
const NormalUser = {
  name: 'Normal',
  value: 'NORMAL',
};
const AgentUser = {
  name: 'Agent',
  value: 'AGENT',
};

const BasicStatus = [StatusActive, StatusBlock, InactiveBlock];
const UserType = [NormalUser, AgentUser];

const StatusObj = {
  [StatusActive.value]: StatusActive.name,
  [StatusBlock.value]: StatusBlock.name,
  [InactiveBlock.value]: InactiveBlock.name,
};
const UserTypeObj = {
  [NormalUser.value]: NormalUser.name,
  [AgentUser.value]: AgentUser.name,
};

export { BasicStatus, StatusObj, UserType, UserTypeObj, NormalUser, AgentUser };
