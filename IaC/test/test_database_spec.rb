describe port(6379) do
  it { should be_listening }
end

describe process("redis-server") do
  it { should be_running }
end
