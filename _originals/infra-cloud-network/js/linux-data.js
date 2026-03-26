// Linux & OS Data Module
const LINUX_DATA = {
  linux: {
    title: "Linux & OS",
    description: "Commands, System Administration, Filesystem, Kernel & Process Management",
    color: "var(--linux-color)",
    subtopics: {
      "Essential Commands": [
        {
          id: "linux-commands",
          title: "Linux Essential Commands Cheat Sheet",
          tags: ["beginner", "commands"],
          summary: "Must-know Linux commands for system administration and daily operations.",
          content: `<h3>File & Directory Operations</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Navigation & Listing
ls -lahS              # list all, human-readable, sort by size
tree -L 2             # directory tree, 2 levels deep
find / -name "*.log" -mtime -7  # files modified in last 7 days
find / -size +100M    # files larger than 100MB
locate filename       # fast search (uses updatedb)

# File Operations
cp -rv src/ dest/     # recursive copy with verbose
rsync -avz src/ dest/ # efficient sync (delta transfer)
ln -s /path/to target # symbolic link
tar czf archive.tar.gz dir/   # compress
tar xzf archive.tar.gz        # extract

# Text Processing
grep -rni "pattern" /path/     # recursive, case-insensitive
awk '{print $1, $3}' file      # print columns 1 and 3
sed -i 's/old/new/g' file      # in-place substitution
cut -d: -f1 /etc/passwd        # cut by delimiter
sort | uniq -c | sort -rn      # count unique occurrences
wc -l file                     # count lines
jq '.key' file.json            # JSON processor</code></pre>
</div>

<h3>System Information</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># System
uname -a              # kernel info
hostnamectl           # hostname & OS info
cat /etc/os-release   # OS version
uptime                # system uptime & load
dmesg | tail          # kernel messages

# Hardware
lscpu                 # CPU info
free -h               # memory usage
df -hT                # disk usage with filesystem type
lsblk                 # block devices
lspci                 # PCI devices
lsusb                 # USB devices
dmidecode -t memory   # detailed RAM info</code></pre>
</div>

<h3>User Management</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>useradd -m -s /bin/bash user  # create user
usermod -aG sudo user         # add to sudo group
passwd user                   # set password
chage -l user                 # password policy
id user                       # show uid/gid/groups
who / w                       # logged-in users
last                          # login history</code></pre>
</div>`
        },
        {
          id: "vim-mastery",
          title: "Vim Mastery - Complete Guide",
          tags: ["beginner", "editor"],
          summary: "Master Vim editor from basics to advanced techniques.",
          content: `<h3>Vim Modes</h3>
<table>
<tr><th>Mode</th><th>Description</th><th>How to Enter</th></tr>
<tr><td>Normal</td><td>Command mode, navigate and manipulate</td><td>Default, press Esc</td></tr>
<tr><td>Insert</td><td>Text insertion</td><td>i, a, o, I, A, O</td></tr>
<tr><td>Visual</td><td>Select text</td><td>v (char), V (line), Ctrl+v (block)</td></tr>
<tr><td>Command</td><td>Execute commands</td><td>:</td></tr>
<tr><td>Replace</td><td>Overwrite characters</td><td>R</td></tr>
</table>

<h3>Essential Navigation</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">vim</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>h j k l           # left, down, up, right
w b e             # word forward, backward, end of word
0 ^ $             # start of line, first non-blank, end of line
gg G              # first line, last line
:n                # go to line n
Ctrl+f Ctrl+b     # page down, page up
Ctrl+d Ctrl+u     # half page down, up
%                 # jump to matching bracket
* #               # search word under cursor (fwd/bwd)</code></pre>
</div>

<h3>Editing Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">vim</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>i a I A           # insert before/after cursor, start/end of line
o O               # new line below/above
dd yy             # delete/yank line
3dd 3yy           # delete/yank 3 lines
D Y               # delete/yank to end of line
x X               # delete char under/before cursor
p P               # paste after/before cursor
r R               # replace char, replace mode
u Ctrl+r          # undo, redo
.                 # repeat last command</code></pre>
</div>

<h3>Advanced Techniques</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">vim</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>ci" ci' ci( ci{   # change inside quotes/parens/braces
di" da"           # delete inside/around quotes
yi' yap           # yank inside quotes, around paragraph
:%s/old/new/g     # substitute all in file
:%s/old/new/gc    # substitute with confirmation
:5,10s/old/new/g  # substitute lines 5-10
qa...q            # record macro in register a
@a                # play macro
@@                # repeat last macro
:.!command        # run shell command and insert output</code></pre>
</div>

<h3>Window Management</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">vim</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>:split :vsplit      # horizontal/vertical split
Ctrl+w w            # cycle through windows
Ctrl+w h/j/k/l      # move to window direction
Ctrl+w c            # close window
Ctrl+w o            # only this window (close others)
:tabs               # list tabs
:tabnew             # new tab
gt gT               # next/previous tab</code></pre>
</div>`
        }
      ],
      "Process & Performance": [
        {
          id: "process-management",
          title: "Process Management & Performance Tuning",
          tags: ["intermediate", "performance"],
          summary: "Process control, resource monitoring, tuning, cgroups, and troubleshooting.",
          content: `<h3>Process Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Process Monitoring
ps aux                        # all processes
ps -eo pid,ppid,%cpu,%mem,cmd --sort=-%cpu | head  # top CPU
top / htop                    # interactive monitor
pidof nginx                   # find PID by name

# Process Control
kill -15 PID                  # graceful stop (SIGTERM)
kill -9 PID                   # force kill (SIGKILL)
kill -1 PID                   # reload config (SIGHUP)
killall nginx                 # kill all by name
nohup command &               # run in background, survive logout
disown %1                     # detach from terminal

# Resource Monitoring
vmstat 1 5                    # virtual memory stats
iostat -x 1                   # disk I/O stats
sar -u 1 5                    # CPU usage history
mpstat -P ALL 1               # per-CPU stats
iotop                         # I/O per process
strace -p PID                 # system call trace
lsof -i :80                   # files/sockets on port 80
ss -tnlp                      # TCP listening sockets</code></pre>
</div>

<h3>Performance Tuning</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Sysctl tuning (network)
sysctl -w net.core.somaxconn=65535
sysctl -w net.ipv4.tcp_max_syn_backlog=65535
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_reuse=1

# File descriptor limits
ulimit -n                     # current FD limit
ulimit -n 65535               # set for session
# Persistent: /etc/security/limits.conf
# * soft nofile 65535
# * hard nofile 65535

# Kernel parameters
cat /proc/sys/vm/swappiness   # swap tendency (0-100)
echo 10 > /proc/sys/vm/swappiness  # reduce swapping</code></pre>
</div>

<h3>Systemd Service Management</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>systemctl start/stop/restart nginx
systemctl enable/disable nginx    # auto-start on boot
systemctl status nginx
systemctl list-units --failed     # failed services
journalctl -u nginx -f            # follow service logs
journalctl --since "1 hour ago"   # recent logs
systemctl daemon-reload           # reload unit files</code></pre>
</div>`
        }
      ],
      "Storage & Filesystem": [
        {
          id: "linux-storage",
          title: "Linux Storage, LVM & Filesystem Management",
          tags: ["intermediate", "storage"],
          summary: "Disk partitioning, LVM, filesystem types, mount, fstab, RAID.",
          content: `<h3>Disk & Partition Management</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># View disks and partitions
lsblk
fdisk -l
blkid                         # show UUIDs

# Partition with fdisk/parted
fdisk /dev/sdb                # MBR partitioning
parted /dev/sdb               # GPT partitioning

# Format filesystem
mkfs.ext4 /dev/sdb1
mkfs.xfs /dev/sdb1

# Mount
mount /dev/sdb1 /mnt/data
mount -o remount,rw /         # remount root as read-write

# Persistent mount (/etc/fstab)
UUID=xxxx  /mnt/data  ext4  defaults,noatime  0  2</code></pre>
</div>

<h3>LVM (Logical Volume Manager)</h3>
<div class="diagram">
Physical Volumes (PV) -> Volume Group (VG) -> Logical Volumes (LV)
  /dev/sdb1                  vg_data             lv_data
  /dev/sdc1                                      lv_logs
</div>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Create LVM
pvcreate /dev/sdb1 /dev/sdc1        # create PVs
vgcreate vg_data /dev/sdb1 /dev/sdc1 # create VG
lvcreate -L 50G -n lv_data vg_data  # create LV
mkfs.ext4 /dev/vg_data/lv_data      # format

# Extend LVM
lvextend -L +20G /dev/vg_data/lv_data
resize2fs /dev/vg_data/lv_data      # ext4
xfs_growfs /mnt/data                # xfs

# View LVM
pvs / vgs / lvs
pvdisplay / vgdisplay / lvdisplay</code></pre>
</div>

<h3>Filesystem Comparison</h3>
<table>
<tr><th>FS</th><th>Max Size</th><th>Features</th><th>Best For</th></tr>
<tr><td>ext4</td><td>1 EB</td><td>Journaling, stable</td><td>General purpose</td></tr>
<tr><td>XFS</td><td>8 EB</td><td>High performance, parallel I/O</td><td>Large files, databases</td></tr>
<tr><td>Btrfs</td><td>16 EB</td><td>Snapshots, compression, CoW</td><td>Advanced features</td></tr>
<tr><td>ZFS</td><td>256 ZB</td><td>Raid-Z, dedup, compression</td><td>Enterprise storage</td></tr>
</table>`
        }
      ],
      "Networking": [
        {
          id: "linux-networking",
          title: "Linux Networking Commands & Configuration",
          tags: ["intermediate", "networking"],
          summary: "ip, ss, tcpdump, network config, bonding, bridging, troubleshooting.",
          content: `<h3>Network Configuration</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># IP address management
ip addr show
ip addr add 10.0.1.10/24 dev eth0
ip addr del 10.0.1.10/24 dev eth0
ip link set eth0 up/down

# Routing
ip route show
ip route add 10.1.0.0/16 via 10.0.1.1
ip route add default via 10.0.1.1
ip route del 10.1.0.0/16

# DNS resolution
cat /etc/resolv.conf
systemd-resolve --status
resolvectl query example.com

# Hostname
hostnamectl set-hostname myserver</code></pre>
</div>

<h3>Troubleshooting</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Connectivity testing
ping -c 4 8.8.8.8
traceroute 8.8.8.8
mtr --report 8.8.8.8         # combined ping + traceroute
curl -vk https://example.com
wget --spider https://example.com

# Port scanning & testing
ss -tnlp                     # listening ports
nc -zv host 80               # test port connectivity
nmap -sT -p 1-1000 host      # port scan

# Packet capture
tcpdump -i eth0 -n port 80
tcpdump -i eth0 -w capture.pcap
tcpdump -i eth0 'host 10.0.1.10 and port 443'

# Bandwidth testing
iperf3 -s                    # server mode
iperf3 -c server_ip          # client mode</code></pre>
</div>

<h3>NetworkManager (nmcli)</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>nmcli device status
nmcli connection show
nmcli connection add type ethernet con-name eth0 ifname eth0 ipv4.addresses 10.0.1.10/24 ipv4.gateway 10.0.1.1 ipv4.dns "8.8.8.8" ipv4.method manual
nmcli connection up eth0</code></pre>
</div>`
        }
      ]
    }
  }
};

// Merge with main KNOWLEDGE_BASE
Object.assign(KNOWLEDGE_BASE, LINUX_DATA);
