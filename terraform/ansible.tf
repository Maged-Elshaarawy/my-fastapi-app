resource "local_file" "ansible_inventory" {
  filename = "${path.root}/../ansible/inventory.ini"

  content = templatefile("${path.root}/inventory.ini.tmpl", {
    ubuntu_ips   = aws_instance.ubuntu[*].public_ip
    ssh_key_path = "${path.root}/lab.pem"
  })
}
