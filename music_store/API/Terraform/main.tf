provider "azurerm" {
    features {}
}

resource "azurerm_resource_group" "tpg_assessment_resource" {
  name     = "tpg-node-assessment-resources"
  location = "East US"
}

# NOTE: the Name used for Redis needs to be globally unique
resource "azurerm_redis_cache" "tpg-node-assessment-redis" {
  name                = "tpg-node-assessment-cache"
  location            = azurerm_resource_group.tpg_assessment_resource.location
  resource_group_name = azurerm_resource_group.tpg_assessment_resource.name
  capacity            = 2
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
   # public_network_access_enabled = true
    enable_authentication = true
  }
}