describe port(3000) do
  it { should be_listening }
end

describe command('ps aux | grep node | grep -v grep') do
  its(:stdout) { should contain('node') }
end

describe command('ps aux | grep pm2 | grep -v grep') do
  its(:stdout) { should contain('pm2') }
end
